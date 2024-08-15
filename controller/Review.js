const reviwe = require("../modal/Review");

const reviweadd = async (req, res) => {
  try {
    const userId = req.userdata._id;
    const comment = req.body.comment;
    const productId = req.body.productId;
    const stare = req.body.stare;
    if (userId && comment && productId && stare) {
      const data = await reviwe.create({
        userId: userId,
        comment: comment,
        productId: productId,
        stare: stare,
      });
      return res.status(200).json({
        Message: "success",
        data,
      });
    } else {
      res.status(400).json({
        Message: "all field are required",
      });
    }
  } catch {
    console.log(e);
    res.status(500).json(e);
  }
};
const getreviews = async (req, res) => {
  try {
    const data = await reviwe.find().populate("userId").populate('productId');
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  reviweadd,
  getreviews
};
