
const wishlisht = require('../modal/AddWishList')
const addwishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userdata._id;
    if ( productId) {
      const findproduct = await wishlisht.findOne({productId})
      if(!findproduct)
      {
        const product = await wishlisht.create({
          productId: productId,
          userId: userId,
        });
        return res.status(200).json({
          Message:'success',
          product
        })
      }
      else
      {
        return res.status(400).json({
          Message: "already added in list ",
        
        });
      }
    } else {
      return res.status(400).json({
        Message: "all fild are require",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
const deletewishlist = async (req,res)=>{
  try{
    const id = req.params.id;
    const deletedeta = await wishlisht.findByIdAndDelete(id)
    if(deletedeta)
    {
      return res.status(200).json({
        Message:"delete data success full"
    })
    }
    else
    {
      return res.status(400).json({
        Message:"data is not found"
    }) 
    }

  }

  catch(e)
  {
    console.log(e);
    return res.status(500).json(e);
  }

}

const getwishlist = async (req,res)=>{
    try{
        const userId = req.userdata._id;
            const data = await wishlisht.find({userId}).populate('productId')
            return res.status(200).json(data)
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json(e)
    }
}
module.exports={
    deletewishlist,
    addwishlist,
    getwishlist
}
