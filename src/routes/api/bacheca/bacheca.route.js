'use strict'

const express = require('express')
const router = express.Router()
const bachecaController = require('../../../controllers/bacheca.controller');

const auth = require('../../../middlewares/authorization')

router.get('/all', auth(), bachecaController.findAll);
router.put('/:id', auth(['admin']), bachecaController.edit);
router.delete('/:id', auth(['admin']), bachecaController.delete);
router.post('/', auth(['admin']), bachecaController.create);


module.exports = router