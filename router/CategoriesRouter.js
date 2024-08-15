const express  = require("express");
const { addcategori, getcategories, deletecategories } = require("../controller/AddCategory");
const { admincheck } = require("../middleware/Auth");
// const Categoriesmodel = require("../modal/Categoriesmodel");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('image');

const Categorierouter = express.Router()
Categorierouter.post('/',admincheck,upload,addcategori);
Categorierouter.get('/',getcategories)
Categorierouter.delete('/:id',deletecategories)
module.exports = Categorierouter

