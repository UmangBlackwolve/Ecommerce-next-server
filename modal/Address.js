const mongoose = require('mongoose');

// Define the address schema
const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  userId:{
    type:String,
    require:true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  isdelete: {
    type: String,
    default: false,
  },
},
{ versionKey: false }
);

module.exports= mongoose.model('Address', addressSchema);