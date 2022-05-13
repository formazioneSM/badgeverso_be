'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  create: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128).required(),
      surname: Joi.string().max(128).required(),
      badge: Joi.string().max(128).required(),
    })
  }
}
