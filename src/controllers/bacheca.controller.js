'use strict'

const httpStatus = require('http-status')
const Bacheca = require('../models/bacheca.model')

exports.findAll = async (req, res, next) => {
  try {
    const results = await Bacheca.find({})
    if(results.length === 0) return res.status(200).json([])
    res.send(results);
  } catch (error) {
    next(error)
  }
}
exports.edit = async (req, res, next) => {
  try {
    await Bacheca.checkUpdatePayload(req.body);
    const result = await Bacheca.findOneAndUpdate({_id:  req.params.id}, req.body)
    if(!result) return res.status(404).json({message: 'something went wrong'})
    res.send(result);
  } catch (error) {
    next(error)
  }
}
exports.delete = async (req, res, next) => {
  try {
    const result = await Bacheca.findOneAndDelete({_id:  req.params.id})
    if(!result) return res.status(500).json({message: 'something went wrong'})
    res.send(result);
  } catch (error) {
    next(error)
  }
}
exports.create = async (req, res, next) => {
    try {
      const body = req.body
      const bacheca = new Bacheca(body)
      const savedBacheca = await bacheca.save()
      res.status(httpStatus.CREATED)
      res.send(savedBacheca)
    } catch (error) {
        next(error)
    }
  }

