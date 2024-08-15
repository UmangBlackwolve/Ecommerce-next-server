const mongoose = require('mongoose')
const CategoriesSchema = new mongoose.Schema({
    
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,    
        require:true,

    },
}, { versionKey: false })

module.exports = mongoose.model('Categories',CategoriesSchema)