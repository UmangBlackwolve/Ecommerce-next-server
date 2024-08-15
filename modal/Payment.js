const mongoose = require('mongoose');
const type = require('mongoose/lib/schema/operators/type');
const Paymentschema = new mongoose.Schema({
    razorpayPaymentId:{
        type:String,
        require:true
    },
    razorpayOrderId:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('payments',Paymentschema)