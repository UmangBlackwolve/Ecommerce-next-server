const mongoose = require('mongoose')
const type = require('mongoose/lib/schema/operators/type')

const Cardschema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
      productId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'products',
          require:true

      },
      quantity: {
          type: Number,
          default:1
        },
      amount:{
        type:Number,
        default:0
      },
      subtotal:{
        type:Number,
        default:0
      }
}, { versionKey: false })
module.exports  = mongoose.model('Cards',Cardschema)