'use strict'

const express = require('express')
const router = express.Router()
const convenzioneController = require('../../../controllers/convenzioni.controller');

const auth = require('../../../middlewares/authorization');

router.get('/all', auth(), convenzioneController.findAll);
router.get('/:id', auth(), convenzioneController.findOne);
router.put('/:id', auth(['admin']), convenzioneController.edit);
router.delete('/:id', auth(['admin']), convenzioneController.delete);
router.post('/', auth(['admin']), convenzioneController.create);


module.exports = router