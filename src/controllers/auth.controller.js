'use strict'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid');
const bcrypt = require('bcrypt-nodejs');
const  transporter = require('../services/transporter')


exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1.v1()
    const body = req.body
    body.activationKey = activationKey;
    const user = new User(body)
    const savedUser = await user.save()
    res.status(httpStatus.CREATED)
    res.send(savedUser.transform())
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    const payload = {sub: user.id, admin:user.role === 'admin'}
    const token = jwt.sign(payload, config.secret)
    return res.json({ message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}
exports.findByBadge = async (req, res, next) => {
  try {
    const results = await User.find({badge: { "$regex": req.params.badge+"$", "$options": "i" }  }).limit(5)
    if(results.length === 0) return res.status(404).json({message: 'user not found'})
    res.send(results);
  } catch (error) {
    next(error)
  }
}
exports.edit = async (req, res, next) => {
  try {
    await User.checkUpdatePayload(req.body);
    const result = await User.findOneAndUpdate({badge: { "$regex": req.params.badge+"$", "$options": "i" }}, req.body)
    if(!result) return res.status(500).json({message: 'something went wrong'})
    res.send(result);
  } catch (error) {
    next(error)
  }
}
exports.delete = async (req, res, next) => {
  try {
    const result = await User.findOneAndDelete({badge: { "$regex": req.params.badge+"$", "$options": "i" }})
    if(!result) return res.status(500).json({message: 'something went wrong'})
    res.send(result);
  } catch (error) {
    next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { 'activationKey': req.query.key },
      { 'active': true }
    )
    return res.json({ message: 'OK' })
  } catch (error) {
    next(error)
  }
}
exports.forgotPassword = async (req, res, next) => {
  try {
    const passwordChangeKey = uuidv1.v1();
   const user = await User.findByIdAndUpdate(req.params.id, {$set:{ passwordChangeKey: passwordChangeKey}},{new:true});
    
    const mailOptions = {
      from: 'noreply',
      to: user.email,
      subject: 'Change password',
      html: `<div><h1>Hello smemorato!</h1><p>Click <a href="${config.hostname}/api/auth/forgotPass/${passwordChangeKey}">link</a> to change your password</p></div><div><h1>Hello developer!</h1><p>Feel free to change this template ;).</p></div>`
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    return res.json({message: 'we sent a mail to '+user.email})
  } catch (error) {
    return next(error)
  }
}
exports.changePassword = async (req, res, next) => {
  try {
   await User.findOneAndUpdate(
      { 'passwordChangeKey' : req.params.passwordChangeKey},
      { 
        $set: {'password': bcrypt.hashSync(req.body.password)},
        $unset: {'passwordChangeKey': 1}
      }
    )
    return res.json({ message: 'OK' })
  } catch (error) {
    next(error)
  }
}
exports.verify = async (req, res, next) => {
  try { 
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), config.secret)
    return res.json({ message: 'OK' })
  } catch (error) {
    next(error)
  }
}