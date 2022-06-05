'use strict'

const express = require('express')
const router = express.Router()
const linkController = require('../../../controllers/link.controller');

const auth = require('../../../middlewares/authorization');

router.get('/all', auth(), linkController.findAll);
router.get('/:id', auth(), linkController.findOne);
router.put('/:id', auth(['admin']), linkController.edit);
router.delete('/:id', auth(['admin']), linkController.delete);
router.post('/', auth(['admin']), linkController.create);


module.exports = router