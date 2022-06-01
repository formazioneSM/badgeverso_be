'use strict'

const express = require('express');
const multer  = require('multer');
const path = require('path');
const router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../../public/uploads'))      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  })
  
  var upload = multer({storage: storage,
      onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
      },
  });
const userController = require('../../../controllers/user.controller');

const auth = require('../../../middlewares/authorization')

router.put('/image/:id', auth() ,userController.userExists, upload.single('file'), userController.editImg);
router.put('/badgeImg/:id', auth(), userController.userExists, upload.single('file'), userController.editBadgeImg);
router.get('/:badge', auth(), userController.findByBadge);
router.put('/:badge', auth(['admin']), userController.edit);
router.delete('/:badge', auth(['admin']), userController.delete);


module.exports = router