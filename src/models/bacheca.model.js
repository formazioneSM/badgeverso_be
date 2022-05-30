'use strict'
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const Schema = mongoose.Schema;
const APIError = require('../utils/APIError');
const fields = ['color', 'text', 'from']
const bachecaSchema = new Schema({
  color: {
    type: String,
    required: true,
    lowercase: true
  },
  text: {
    type: String,
    required: true,
    minlength: 4
  },
  from: {
    type: String,
    required: true
  }
})
bachecaSchema.statics = {
    
    async checkUpdatePayload (payload) {
        if(Object.keys(payload).some(k => !fields.includes(k))){
            throw new APIError('invalid key provided for edit post', httpStatus.BAD_REQUEST, {acceptedFields: fields})
        }
        const bacheca = await this.find(payload).exec()
        return bacheca;
      }
}
module.exports = mongoose.model('Bacheca', bachecaSchema)
