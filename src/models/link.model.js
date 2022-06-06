'use strict'
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const Schema = mongoose.Schema;
const APIError = require('../utils/APIError');
const fields = ['text', 'url']
const linkSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})
linkSchema.statics = {

  async checkUpdatePayload(payload) {
    if (Object.keys(payload).some(k => !fields.includes(k))) {
      throw new APIError('invalid key provided for edit post', httpStatus.BAD_REQUEST, { acceptedFields: fields })
    }
    const link = await this.find(payload).exec()
    return link;
  }
}
module.exports = mongoose.model('Link', linkSchema)
