const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  forgettoken: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  phoneNumber: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'User'
  }
}
  , { versionKey: false }
)
module.exports = mongoose.model('users', userSchema)