const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
  },

  company: {
    type: String,
  },
  image: [{ type: String }],
  isdelete: {
    type: String,
    default: false,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
  },
}, { versionKey: false });
module.exports = mongoose.model("products", productSchema);
