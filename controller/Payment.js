

const Razorpay = require('razorpay');
const paymentmodal = require('../modal/Payment');
const {RAZORPAY_ID_KEY,RAZORPAY_SECRET_KEY} = process.env
  var instance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY,
  });
  const checkoutpay = async (req,res)=>{
const options = {
    amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
    currency: "INR",
    // receipt: "order_rcptid_11"

}
 const order =  await  instance.orders.create(options)
    return res.status(200).json({
        Message:"sccess",
        order
    })
  }
  const verifyPayment = async (req, res) => {
    try {
        const { razorpayPaymentId, razorpayOrderId } = req.body;
        const payment = await instance.payments.fetch(razorpayPaymentId);
        
        if (payment.order_id === razorpayOrderId && payment.status === 'captured') {
            const data = await paymentmodal.create({
                razorpayPaymentId,
                razorpayOrderId
            });
            res.json({
                status: 200,
                message: "Payment verification successful",
            });
        } else {
            res.json({
                status: 200,
                message: "Payment verification failed",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            status: 500,
            message: "Internal server error",
        });
    }
};


const getkey = async(req,res)=>{
  res.status(200).json({key:process.env.RAZORPAY_ID_KEY})
}


module.exports ={
    checkoutpay,
    verifyPayment ,
    getkey 
} 
