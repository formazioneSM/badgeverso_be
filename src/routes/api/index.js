'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth/auth.route');
const userRouter = require('./user/user.route');
const bachecaRouter = require('./bacheca/bacheca.route');
const convenzioneRouter = require('./convenzioni/convenzioni.route');
const linkRouter = require('./link/link.route');
router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/bacheca', bachecaRouter);
router.use('/convenzione', convenzioneRouter);
router.use('/link', linkRouter);


module.exports = router
