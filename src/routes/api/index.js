'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth/auth.route');
const userRouter = require('./user/user.route');
const bachecaRouter = require('./bacheca/bacheca.route');
router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/bacheca', bachecaRouter);


module.exports = router
