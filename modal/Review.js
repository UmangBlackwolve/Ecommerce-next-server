const mongoose = require("mongoose");
const type = require("mongoose/lib/schema/operators/type");
const reviweSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    comment: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref:"products"
    },
    stare: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
  
);

module.exports = mongoose.model("reviwes", reviweSchema);
