const mongoose  = require('mongoose')

const adminmodalSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String
    },
    email:{
        type:String,    
        unique: true
    },
    token:{
        type:String,
        default:null
    },
    role:{
        type:String
    }
          
},
{ versionKey: false }

)
module.exports  = mongoose.model('admin',adminmodalSchema)