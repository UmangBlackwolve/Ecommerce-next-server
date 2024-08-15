const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://lakkadumang306:ecommerce@cluster0.okyzvlb.mongodb.net/nest");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
 