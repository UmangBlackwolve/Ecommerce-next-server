const express = require('express')
const { adminlogin, adminforget, adminresertpassword, getadmin } = require('../controller/AdminLogin')
const { check } = require('../middleware/Auth')

const adminrouter = express.Router()

 adminrouter.post('/',adminlogin)
 adminrouter.post('/forgot-password',adminforget),
 adminrouter.get('/',getadmin)
 adminrouter.post('/reset-password/:id',adminresertpassword)

 
 module.exports = adminrouter;