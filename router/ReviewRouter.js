const express = require('express')
const { check } = require('../middleware/Auth')
const { reviweadd, getreviews } = require('../controller/Review')
const reviwerouter = express.Router()

reviwerouter.post('/',check,reviweadd)
reviwerouter.get('/',getreviews)



module.exports = reviwerouter;