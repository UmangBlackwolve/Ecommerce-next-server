const express = require('express')
const { add, getitem, deleteitem, deleteall, quantityplus, quantityminus } = require('../controller/AddToCart')
const { check } = require('../middleware/Auth')
const addrouter = express.Router()

addrouter.post('/add',check,add)
addrouter.get('/',check,getitem)
addrouter.delete('/:id',check,deleteitem)
addrouter.put('/qtyplus/:id',quantityplus)
addrouter.get('/qtyminus/:id',quantityminus)
addrouter.get('/alldelete',check,deleteall)


module.exports = addrouter      