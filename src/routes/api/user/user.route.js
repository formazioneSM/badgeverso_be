'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/user.controller');

const auth = require('../../../middlewares/authorization')

router.get('/:badge', auth(), userController.findByBadge);
router.put('/:badge', auth(['admin']), userController.edit);
router.delete('/:badge', auth(['admin']), userController.delete);


module.exports = router