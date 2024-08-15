const express = require('express')
const { addwishlist, getwishlist, deletewishlist } = require('../controller/WishList')
const { check } = require('../middleware/Auth')

const wishlistrouter = express.Router()

wishlistrouter.post('/',check,addwishlist)
wishlistrouter.get("/",check,getwishlist)
wishlistrouter.delete('/:id',check,deletewishlist)


module.exports = wishlistrouter