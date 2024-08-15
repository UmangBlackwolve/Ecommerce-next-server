const express = require('express');
const { check, admincheck } = require('../middleware/Auth');
const { addproduct, getproduct, deleteproduct, singleproduct, editproduct, Categoriesproduct } = require('../controller/Product');
const multer = require('multer');
const productrouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
}); 

const upload = multer({ storage: storage }).array('image');

productrouter.post('/add-product',admincheck, upload, addproduct);
productrouter.get('/', getproduct);
productrouter.get("/category/:category",Categoriesproduct)
productrouter.delete('/:id', deleteproduct);
productrouter.delete('/deleteall/:id', deleteproduct);
productrouter.get('/:id', singleproduct);
productrouter.put('/edit/:id', admincheck,upload, editproduct);

module.exports = productrouter;
