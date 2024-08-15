const express = require('express')
const { check, admincheck } = require('../middleware/Auth')
const { addorder, getorder, editstatus, getallorder, getsingleorder } = require('../controller/OrderList')
const orderrouter = express.Router()


orderrouter.post('/add-order',check,addorder)
orderrouter.get('/',check,getorder)
orderrouter.put("/:id",check,editstatus)
orderrouter.get('/allorder',admincheck,getallorder)
orderrouter.get('/:id',getsingleorder)

module.exports={
    orderrouter
}