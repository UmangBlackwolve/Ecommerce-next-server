const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByIdAndUpdate } = require("../modal/User");
var nodemailer = require("nodemailer");
const { json } = require("body-parser");
const user = require("../modal/User");
const { generateToken } = require("../middleware/Common");

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const useradmin = await user.findOne({ email });

      if (useradmin) {
        if (bcript.compareSync(password, useradmin.password)) {

          let token = generateToken(useradmin);

          return res.status(200).json({
            Message: "success",
            status: 200,
            token,
          });
        } else {
          return res.status(400).json({
            Message: "Invalid password ",
          });
        }
      } else {
        return res.status(400).json({
          Message: "user is not found",
        });
      }
    } else {
      return res.status(400).json({
        Message: "email and password is require ",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
const adminforget = async (req, res) => {
  try {
    const email = req.body.email;
    if (email) {
      const olduser = await user.findOne({ email });
      if (olduser) {
        const secret = process.env.JWT_ADMIN_FORGET + olduser.password;

        const token = jwt.sign(
          { email: olduser.email, _id: olduser.id },
          secret,
          {
            expiresIn: "10m",
          }
        );

        if (token) {
          const savetoken = await user.findByIdAndUpdate(
            { _id: olduser._id },
            {
              token: token,
            },
            {
              new: true,
            }
          );
          const link = `http://localhost:3000/admin/reset-password/${olduser._id}`;
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
              subject: "admin resert-password",
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
          return res.status(200).json({
            Message: "check your email",
          });
        } else {
          return res.status(400).json({
            Message: "token is not created ",
          });
        }
      } else {
        return res.status(400).json({
          Message: "user is not fond",
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

const adminresertpassword = async (req, res) => {
  try {
    const id = req.params.id;
    const password = req.body.password;
    const oldUser = await user.findOne({ _id: id });
    if (oldUser) {
      const secret = process.env.JWT_ADMIN_FORGET + oldUser.password;
      try {
        varify = jwt.verify(oldUser.token, secret);
        if (varify) {
          const hashpassword = await bcript.hash(password, 10);
          await user.findByIdAndUpdate(
            { _id: oldUser._id },
            {
              password: hashpassword,
              token: null,
            },
            {
              new: true,
            }
          );
          return res.status(200).json({
            Message: "password is updated",
          });
        } else {
          return res.status(400).json({
            Message: "not varify",
          });
        }
      } catch (e) {
        console.log(e);
        return res.status(400).json(e);
      }
    } else {
      return (
        res.status(400),
        json({
          Message: "users is not found",
        })
      );
    }
  } catch (e) {
    console.log(e);
    return req.status(400).json(e);
  }
};

const getadmin = async (req, res) => {

  try {
    const data = await user.find();

    return res.status(200).json(data)

  }
  catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
}
module.exports = {
  adminlogin,
  adminforget,
  adminresertpassword,
  getadmin
};
