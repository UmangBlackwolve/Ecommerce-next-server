const mongoose  = require('mongoose')
const wishlistScema= new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"products",
        require:true
    }
},
{ versionKey: false })
module.exports = mongoose.model('wishlist',wishlistScema)   