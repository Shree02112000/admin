const express = require('express')
const router = express.Router()

const admincontroller = require('../controller/admincontroller')

router.post('/adminregister',admincontroller.adminregister)
router.post('/adminlogin',admincontroller.adminlogin)
module.exports= router