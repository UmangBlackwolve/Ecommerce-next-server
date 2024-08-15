const cardmodal = require("../modal/Card");

const add = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userdata._id;
    console.log(productId)
    console.log(quantity)
    console.log(userId)

    if (productId && userId) {
   
      let cartItem = await cardmodal.findOne({ userId, productId });

      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        cartItem = await cardmodal.create({ userId, productId, quantity });
      }

      return res.status(200).json({
        message: "Item added to cart successfully.",
        product: cartItem,
      });
    } else {
      return res.status(400).json({
        Message: "all fild are require ",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
const deleteitem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedata = await cardmodal.findByIdAndDelete(id);
    if(deletedata)
    {
        return res.status(200).json({
            Message: "delete data success",
          });
    }
    else
    {
        return res.status(400).json({
            Message: "dataa is not found",
          });  
    }

 
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteall = async (req, res) => {
  try {
    const userId = req.userdata._id;
    console.log(userId)
    const deletedata = await cardmodal.deleteMany({userId });
    if(deletedata)
    {
        return res.status(200).json({
            Message: "delete data success",
            deletedata
          });
    }
    else
    {
        return res.status(400).json({
            Message: "dataa is not found",
          });  
    }

 
  } catch (e) {
    console.log(e)
    return res.status(500).json(e);
  }
};
const getitem = async (req, res) => {
  try {
    const userId = req.userdata._id;
    const product = await cardmodal.find({ userId }).populate("productId");
    return res.status(200).json(product);
  } catch (e) {
    console.log(e)
    return res.status(500).json(e);
  }
};

const quantityplus = async (req,res)=>{
  try{
    const id  = req.params.id
    const quantity = req.body.quantity;
    console.log(quantity)
    if(quantity>0)
    {
      let data = await cardmodal.findByIdAndUpdate(id,{
        quantity:quantity
      },{
        new:true
      })
      return res.status(200).json(data)
    }
    else if(quantity==0)
    {
      let data = await cardmodal.findByIdAndDelete(id,)  
      return res.status(200).json(data)
    }
    else{
      return res.status(400).json({
        Message:"all fild are require"
      });
    }
  }
  catch(e)
  {
    console.log(e)
    return res.status(500).json(e);
  }
}

const quantityminus= async (req,res)=>{
  try{
    const id = req.params.id

    const data = await cardmodal.findOne({id})
   data.quantity-1;
   data.save()
   return res.status(200).json(data)

  }
  catch(e)
  {
    console.log(e)
    return res.status(500).json(e);
  }
}

module.exports = {
  add,
  getitem,
  deleteitem,
  // deleteall
  deleteall,
  quantityminus,
  quantityplus
};
