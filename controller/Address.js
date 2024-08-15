const Address = require("../modal/Address");

const addAddress = async (req, res) => {
  try {
    const { fullName, address, city, state, postalCode, country, phoneNumber } =
      req.body;
      console.log("fullName",fullName,address,city,state,postalCode,country,phoneNumber)
    const userId = req.userdata._id;

    if (
      fullName &&
      address &&
      city &&
      state &&
      postalCode &&
      country &&
      phoneNumber &&
      userId
    ) 
       
    {
      Addresstotal = await Address.find({userId})
      if(Addresstotal.length<=5)
      {
        const data = await Address.create({
          fullName,
          address,
          city,
          state,
          postalCode,
          country,
          phoneNumber,
          userId,
        });
        return res.status(200).json({
          Message: "success",
          data,
        });
      }
      else
      {
        return res.status(400).json({
          Message: "all redy 5 time address add",
        });
      }
   
    } else {
      return res.status(400).json({
        Message: "all field are required",
      });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

const editadress = async (req, res) => {
  try {
    const { fullName, address, city, state, postalCode, country, phoneNumber } =
      req.body;
    const id = req.params.id;
    const data = await Address.findByIdAndUpdate(
      { _id: id },
      {
        fullName,
        address,
        city,
        state,
        postalCode,
        country,
        phoneNumber,
      },
      {
        new: true,
      }
      
    );

    return res.status(200).json({
        Message: "success",
        data,
      });
  } catch (e) {
    return res.status(500).json(e);
  }
};
const deleteadress = async (req,res)=>{
    try{
        const id = req.params.id
        const data = await Address.findByIdAndUpdate(
            id,
            {
              isdelete: true,
            },
            {
              new: true,
            }
          );
            return res.status(200).json({
              Message: "address is delete",
            });         
    }
    catch(e)
    {
        return res.status(500).json(e)
    }
}

const getaddress  = async (req,res)=>{
try
{
  const userId = req.userdata._id;
  const isdelete = false
  const data = await Address.find({userId,isdelete})
return res.status(200).json(data)
}
catch(e)
{
  console.log(e)
  return res.state(500).json(e)
}
}

module.exports = {
  addAddress,
  editadress,
  deleteadress,
  getaddress
};
