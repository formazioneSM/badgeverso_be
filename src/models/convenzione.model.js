'use strict'
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const Schema = mongoose.Schema;
const APIError = require('../utils/APIError');
const fields = ['titoloLink', 'text', 'url', 'titolo']
const convenzioneSchema = new Schema({
  titoloLink: {
    type: String,
    required: true,
    lowercase: true
  },
  text: {
    type: String,
    required: true,
    minlength: 4
  },
  url: {
    type: String,
    required: true
  },
  titolo: {
    type: String,
    required: true
  }
})
convenzioneSchema.statics = {
    
    async checkUpdatePayload (payload) {
        if(Object.keys(payload).some(k => !fields.includes(k))){
            throw new APIError('invalid key provided for edit post', httpStatus.BAD_REQUEST, {acceptedFields: fields})
        }
        const convenzione = await this.find(payload).exec()
        return convenzione;
      }
}
module.exports = mongoose.model('Convenzione', convenzioneSchema)
