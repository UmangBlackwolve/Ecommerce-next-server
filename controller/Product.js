const { pipeline } = require("nodemailer/lib/xoauth2");
const productmodal = require("../modal/Product");
const Product = require("../modal/Product");
const mongoose = require("mongoose");

const addproduct = async (req, res) => {
  try {
    console.log("req.bodyreq.bodyreq.bodyreq.bodyreq.body", req.body);

    const { name, price, category, company, stock, description } = req.body;

    console.log(req.file, "req.filereq.file");
    const image = await req.files.map((file) => file.path); //

    if (name && price && category && company && stock && description) {
      const Products = await Product.create({
        name,
        price,
        category,
        company,
        stock,
        description,
        image,
      });
      return res.status(200).json({
        Message: "success",
        Products,
      });
    } else {
      return res.status(400).json({
        Message: "all field are required",
      });
    }
  } catch (e) {
    console.log("DDD", e);
    return res.status(500).json({ error: e.message });
  }
};

const getproduct = async (req, res) => {
  try {
  const products = await Product.aggregate([
    {
      $match: { isdelete: "false" }
    },
    {
      $lookup:{
        from:"reviwes",
        localField:"_id",
        foreignField:"productId",
        as:"data",
        pipeline:[
          {
            $lookup:{
              from: "users",
              localField:"userId",
              foreignField:"_id",
              as: "reviewUsers"
            }
          }
        ]
      }
    }
   ]);
   return res.status(200).json(products)
   
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};
const deleteproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        isdelete: true,
      },
      {
        new: true,
      }
    );
    if(product)
    {
      return res.status(200).json({
        Message: "product is delete",
      });
    }
    else
    {
      return res.status(400).json({
        Message: "product is not found",
      });
    }

   
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};
const editproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await req.files.map((file) => file.path)
    const { name, price, category, company, stock,description} = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        company,
        stock,
        description,
        image,
  
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      Message: "success",
      product,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};
const singleproduct = async (req, res) => {
  try {
    const id = req.params.id

    // Fetch reviews related to the product using aggregation
    const reviewData = await Product.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "reviwes",
          localField: "_id",
          foreignField: "productId",
          as: "data",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField:"userId",
                foreignField:"_id",
                as: "reviewUsers"
              }
            },
          
          ]
        }
      }
    ]);

    console.log(reviewData, "reviewData");

    return res.status(200).json({
      Message: "success",
      product: reviewData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

const Categoriesproduct = async (req, res) => {
  try {
    const category = req.params.category;
    const isdelete = false;
    const data = await productmodal.find({ category: category, isdelete });

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(400).json({
        Message: "data is not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
module.exports = {
  addproduct,
  getproduct,
  deleteproduct,
  singleproduct,
  editproduct,
  Categoriesproduct,
};
