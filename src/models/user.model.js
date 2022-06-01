'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const transporter = require('../services/transporter')
const config = require('../config');
const getTemplate = require('../utils/mailTemplate')

const Schema = mongoose.Schema

const roles = [
  'user', 'admin'
]

const fields = ['id', 'name', 'surname', 'badge', 'email', 'createdAt', 'role', 'img', 'badgeImg']

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  surname: {
    type: String,
    required: true,
    maxlength: 50
  },
  badge: {
    type: String,
    required: true,
    maxlength: 50
  },
  activationKey: {
    type: String,
    unique: true
  },
  passwordChangeKey: {
    type: String,
    unique: true
  },
  active: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'user',
    enum: roles
  },
  img: {
    type: String,
    required: false,
    default: ''
  },
  badgeImg: {
    type: String,
    required: false,
    default: ''
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function save (next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }

    this.password = bcrypt.hashSync(this.password)

    return next()
  } catch (error) {
    return next(error)
  }
})


userSchema.post('save', async function saved (doc, next) {
  try {
    const mailOptions = {
      from: 'noreply',
      to: this.email,
      subject: 'Conferma creazione account',
      html: getTemplate('Benvenuto nel badgeverso!', `<p>Click <a href="${config.hostname}/api/auth/confirm?key=${this.activationKey}">link</a> per attivare il tuo nuovo account.</p>`) 
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    return next()
  } catch (error) {
    return next(error)
  }
})

userSchema.method({
  transform () {
    const transformed = {}
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  },

  passwordMatches (password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  roles,

  checkDuplicateEmailError (err) {
    if (err.code === 11000) {
      var error = new Error('Email already taken')
      error.errors = [{
        field: 'email',
        location: 'body',
        messages: ['Email already taken']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }

    return err
  },

  async checkUpdatePayload (payload) {
    const filteredFields = fields.filter(f => f!=='password' && f !== 'createdAt');
    if(Object.keys(payload).some(k => !filteredFields.includes(k))){
      throw new APIError('invalid key provided for edit user', httpStatus.BAD_REQUEST, {acceptedFields: filteredFields})
    }
    return user;
  },
  async findAndGenerateToken (payload) {
    const { email, password } = payload
    if (!email) throw new APIError('Email must be provided for login')

    const user = await this.findOne({ email }).exec()
    if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

    const passwordOK = await user.passwordMatches(password)

    if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED)

    if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)

    return user
  }
}

module.exports = mongoose.model('User', userSchema)
