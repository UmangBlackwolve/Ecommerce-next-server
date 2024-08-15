const cardmodal = require("../modal/Card");
const ordermodal = require("../modal/Order");
const { v4: uuid } = require('uuid');

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Function to generate an order number
function generateOrderNumber() {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomString = generateRandomString(5); // Generate a random string of length 5
  return `${timestamp}${randomString}`;
}

const addorder = async (req, res) => {
  try {
    const userId = req.userdata._id;

    const { Product, quantity, subtotal,status ,Addressid} = req.body;
    console.log(quantity);
    if (userId && Product && subtotal) {
      // const subtotal = subtotal+Product.amount
      const data = await ordermodal.create({
        userId,
        Product,
        subtotal,
        Addressid,
        status,
        ordernumber:generateOrderNumber()
      });
      // const deletedata = await cardmodal.deleteMany({userId});
      res.status(200).json(
        data,);
    } else {
      res.status(200).json({
        Message: "all field are required ",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
const editstatus = async (req, res) => {
  try {
    const { status } = req.body;
    let id = req.params.id;
    const userId = req.userdata._id;

    if (status) {

      const data = await ordermodal.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
      );
     


      return res.status(200).json({
        Message:"success",
        data
      })
    } else {
      res.status(200).json({
        Message: "all field are required ",
      });
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json(e);
  }
};
const getorder = async (req, res) => {
  try {
    const userId = req.userdata._id;
    const order = await ordermodal
      .find({ userId })
      .populate("Product.productId").populate("Product.productId").populate('Addressid');
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
const getallorder = async (req,res) =>{
try{
  const order = await ordermodal.find().populate("Product.productId").populate('Addressid').populate('userId');
  return res.status(200).json(order)
}
catch(e)
{
  console.log(e)
return res.status(500).json(e)
}

};
const getsingleorder = async (req,res)=>{
 try
 {
  const id = req.params.id;
  const order = await ordermodal.findOne({_id:id}).populate('Product.productId').populate('userId').populate('Addressid')
  if(order)
  {
    return res.status(200).json(order)
  }
  else
  {
return res.status(400).json({
  Message:"order is not found"
})
  }
 }
 catch(e)
 {
  return res.status(500).json(e)
 }
}
// const updetestatus  = as
module.exports = {
  addorder,
  getorder,
  editstatus,
  getallorder,
  getsingleorder
};
