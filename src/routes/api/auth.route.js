'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const { validate } = require('express-validation');
const { create } = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

router.post('/register', validate(create), authController.register); // validate and register
router.post('/login', authController.login); // login
router.get('/confirm', authController.confirm);
router.get('/checkToken', authController.verify);
router.get('/:badge', auth(), authController.findByBadge);
router.put('/:badge', auth(['admin']), authController.edit);
router.put('/forgotPassword/:id', auth(), authController.forgotPassword);
router.post('/changePass/:passwordChangeKey', authController.changePassword);
router.delete('/:badge', auth(['admin']), authController.delete);

router.get('/forgotPass/:passwordChangeKey', (req, res) => {
  res.render( 'pages/index')
})

module.exports = router
