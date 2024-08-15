const  express = require('express')
const { checkoutpay, getkey, verifyPayment } = require('../controller/Payment')
const payrouter = express.Router()
payrouter.post("/checkout",checkoutpay)
payrouter.get("/getkey",getkey)
payrouter.post('/verifyPayment',verifyPayment)
module.exports = payrouter