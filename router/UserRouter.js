const express = require('express')
const { register, login, getuser, deleteuser, forgot, resetpassword, updateprofile } = require('../controller/LoginRegister')
const { check, admincheck } = require('../middleware/Auth')

const userrouter = express.Router()

userrouter.post('/register',register)
userrouter.post('/login',login)
userrouter.get('/',admincheck,getuser)
userrouter.post('/forgot-password',forgot)
userrouter.post('/update-profile',check,updateprofile)
userrouter.post('/reset-password/:id',resetpassword)
userrouter.delete ('/:id',admincheck,deleteuser)

module.exports = userrouter         