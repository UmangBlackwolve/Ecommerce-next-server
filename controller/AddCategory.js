// const { model } = require("mongoose")
const Categoriesmodel = require("../modal/Category")

const addcategori = async (req, res) => {
    try {

        const { name } = req.body
        if (name) {
            const data = await Categoriesmodel.create({ name: name, image: req.file.path })
            return res.status(200).json({
                Message: "success",
                data
            })
        }
        else {
            return res.status(400).json({
                Message: "all fild are require"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
const getcategories = async (req, res) => {
    try {
        const data = await Categoriesmodel.find()
        return res.status(200).json(data)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }

}
const deletecategories = async (req, res) => {
    try {
        const id = req.params.id
        const deletedata = await Categoriesmodel.findByIdAndDelete(id)
        if (deletedata) {
            return res.status(200).json({
                Message: "delete data success full"
            })
        }
        else {
            return res.status(400).json({
                Message: "data is not found"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }

}
module.exports = {
    addcategori,
    getcategories,
    deletecategories

}

