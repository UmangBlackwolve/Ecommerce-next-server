const mongoose = require("mongoose");

const reviwe = require("./Review");
const type = require("mongoose/lib/schema/operators/type");

const ordersSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref:"users"
  },
  Product:[ 
    {
      productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
            require:true
        },
        quantity:{
          type:String,
          // require:true
      },
      amount:{
        type:Number,
        default:0
      }     
    }
   
  ],
subtotal:{
  type:String,
  default:0
},
Addressid:{
type:mongoose.Schema.Types.ObjectId,
ref:"Address",
require:true
},
total:{
  type:String,
  // require:true
},
status:{
  type:String,
  default:"panding"
},
ordernumber:{
  type:String
}
}, { versionKey: false,timestamps: true}
);
module.exports = mongoose.model("orderlist", ordersSchema);
