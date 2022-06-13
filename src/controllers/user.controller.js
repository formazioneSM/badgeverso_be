'use strict'

const User = require('../models/user.model')
const config = require('../config');
const fs = require('fs');
const path = require('path');
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
exports.userExists = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({message: 'user not found'});
    return next();
  } catch (error) {
    next(error)
  }
}
exports.editImg = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {img: config.hostname+'/uploads/'+req.file.filename} );
    // if(user.img !== ''){
    //   let splittedUrl = user.img.split('/');
    //   let filename = splittedUrl[splittedUrl.length-1];
    //   if(fs.existsSync(path.join(__dirname, '../public/uploads/'+filename))){
    //     await fs.unlinkSync(path.join(__dirname, '../public/uploads/'+filename));
    //   }
    // }
    res.send({url: config.hostname+'/uploads/'+req.file.filename});
  } catch (error) {
    next(error)
  }
}
exports.editBadgeImg = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {badgeImg: config.hostname+'/uploads/'+req.file.filename} );
    if(user.badgeImg !== ''){
      let splittedUrl = user.badgeImg.split('/');
      let filename = splittedUrl[splittedUrl.length-1];
      if(fs.existsSync(path.join(__dirname, '../public/uploads/'+filename))){
        await fs.unlinkSync(path.join(__dirname, '../public/uploads/'+filename));
      }
    }
    res.send({url: config.hostname+'/uploads/'+req.file.filename});
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

