const User = require("../modal/User");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");
require("dotenv").config();
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (email && password && name) {
      var findemail = await User.findOne({ email });
      if (!findemail) {
        const hashpassword = await bcript.hash(password, 10);
        const user = await User.create({ email, password: hashpassword, name });

        res.status(200).json({
          Message: "success",
          user,
        });
      } else {
        res.status(400).json({
          Message: "Already Registered User",
        });
      }
    } else {
      return res.status(400).json({
        Message: "email and password name is require",
      });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user) {
        if (bcript.compareSync(password, user.password)) {
          const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            Message: "success",
            token,
          });
          console.log(".........................", token)
        } else {
          res.status(400).json({
            Message: "Invalid password ",
          });
        }
      } else {
        res.status(400).json({
          Message: "user not found",
        });
      }
    } else {
      return res.status(400).json({
        Message: "email  and passworsd is require ",
      });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};
const getuser = async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
};
const updateprofile = async (req, res) => {

  try {
    const { name, lastName, dateOfBirth, phoneNumber, email } = req.body
    const userId = req.userdata._id;
    const data = await User.findByIdAndUpdate({ _id: userId }, {
      name,
      lastName,
      dateOfBirth,
      phoneNumber,
      email
    }, {
      new: true
    })
    res.status(200).json({
      Message: "success",
      data
    })

  }
  catch (e) {
    console.log(e)
    return res.status(500).json(e);
  }

}
const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      Message: " user delete sucsses",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};
const forgot = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const findemail = await User.findOne({ email });
      if (findemail) {
        const secret = process.env.JWT_SECRET_KEY + findemail.password;
        const token = jwt.sign(
          { email: findemail.email, id: findemail._id },
          secret,
          {
            expiresIn: "10m",
          }
        );
        if (token) {
          const savetoken = await User.findByIdAndUpdate(
            { _id: findemail._id },
            {
              forgettoken: token,
            },
            {
              new: true,
            }
          );

          const link = `http://localhost:2000/user/reset-password/${findemail._id}`;
          console.log(link);
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "testsi2023@gmail.com",
              pass: "omawkxnlkkifvjle",
            },
          });

          // var mailOptions =

          transporter.sendMail(
            {
              from: "testsi2023@gmail.com",
              to: email,
              subject: "forgot password",
              text: link,
            },
            function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            }
          );
          res.status(200).json({
            Message: "check your mail",
          });
        } else {
          return res.status(400).json({
            Message: "token is not create",
          });
        }
      } else {
        res.status(400).json({
          Message: "user is not found",
        });
      }
    } else {
      return res.status(400).json({
        Message: "email is require",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
const resetpassword = async (req, res) => {
  try {
    // const token = req.params.token;
    const id = req.params.id;
    const password = req.body.password;
    const oldUser = await User.findOne({ _id: id });

    if (oldUser) {
      const secret = process.env.JWT_SECRET_KEY + oldUser.password;
      try {
        const verify = jwt.verify(oldUser.token, secret);
        const hashpassword = await bcript.hash(password, 10);
        await User.findByIdAndUpdate(
          { _id: id },
          {
            password: hashpassword,
            forgettoken: null,
          },
          {
            new: true,
          }
        );

        res.send("password is updated");
      } catch (e) {
        console.log(e);

        res.status(400).json({
          Message: "not verify",
        });
      }
    } else {
      return res.status(400).json({
        Message: " use is not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
// const resetpost = async (req,res)=>{
//     try{
//      const token = req.params.token;
//      const id = req.params.id;
//      const oldUser = await User.findOne({_id:id});

//      if(oldUser)
//      {
//          const secret = process.env.JWT_SECRET_KEY + oldUser.password;
//          try{
//              const verify = jwt.verify(token,secret)
//              res.render("index",{email:verify.email})
//          }
//          catch(e)
//          {
//               res.status(400).send({
//                  Message:"not verify"
//              })

//          }
//      }
//      else{
//          return res.status(400).json({
//              Message:" use is not found"
//          })
//      }

//     }
//     catch(e)
//     {
//      console.log(e)
//  return res.status(500).json(e)
//     }

//  }
module.exports = {
  register,
  login,
  getuser,
  deleteuser,
  forgot,
  resetpassword,
  updateprofile
};
