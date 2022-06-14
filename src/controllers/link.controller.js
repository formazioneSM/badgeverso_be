'use strict'

const httpStatus = require('http-status')
const Link = require('../models/link.model')

exports.findAll = async (req, res, next) => {
  try {
    const results = await Link.find({}).sort({_id: -1})
    if(results.length === 0) return res.status(200).json([])
    res.send(results);
  } catch (error) {
    next(error)
  }
}
exports.findOne = async (req, res, next) => {
  try {
    const results = await Link.findById(req.params.id)
    if(results.length === 0) return res.status(200).json([])
    res.send(results);
  } catch (error) {
    next(error)
  }
}
exports.edit = async (req, res, next) => {
  try {
    await Link.checkUpdatePayload(req.body);
    const result = await Link.findOneAndUpdate({_id:  req.params.id}, req.body)
    if(!result) return res.status(404).json({message: 'something went wrong'})
    res.send(result);
  } catch (error) {
    next(error)
  }
}
exports.delete = async (req, res, next) => {
  try {
    const result = await Link.findOneAndDelete({_id:  req.params.id})
    if(!result) return res.status(500).json({message: 'something went wrong'})
    res.send(result);
  } catch (error) {
    next(error)
  }
}
exports.create = async (req, res, next) => {
    try {
      const body = req.body
      const link = new Link(body)
      const savedLink = await link.save()
      res.status(httpStatus.CREATED)
      res.send(savedLink)
    } catch (error) {
        next(error)
    }
  }

