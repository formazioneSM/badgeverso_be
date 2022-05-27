'use strict'

const User = require('../models/user.model')

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

