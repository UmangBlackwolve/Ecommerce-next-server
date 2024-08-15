const express = require('express')
const { check } = require('../middleware/Auth')
const { addAddress, deleteadress, editadress, getaddress } = require('../controller/Address')
const Addressrouter = express.Router()

Addressrouter.post('/',check,addAddress)
Addressrouter.put('/:id',check,editadress   )
Addressrouter.get('/',check,getaddress)
Addressrouter.delete('/:id',check,deleteadress)

module.exports = Addressrouter