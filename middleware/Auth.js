const jwt = require("jsonwebtoken");
const Usermodal = require("../modal/User");
var mongoose = require("mongoose");
const adminmodal = require("../modal/Admin");
const user = require("../modal/User");
const check = async (req, res, next) => {
  try {
    const authHeader = await req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decode) {
          const user = await Usermodal.findOne({
            _id: new mongoose.Types.ObjectId(decode.id),
          });
          if (user) {
            req.userdata = {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
            next();
          } else {
            res.status(400).json({
              Message: "unauthorized user",
            });
          }
        } else {
          res.status(400).json({
            Message: "unauthorized user",
          });
        }
      } else {
        res.status(400).json({
          Message: "unauthorized user",
        });
      }
    } else {
      res.status(400).json({
        Message: "unauthorized user",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const admincheck = async (req, res, next) => {
  try {
    const authHeader = await req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const decode = jwt.verify(token, process.env.ADMIN_SECRET_KEY)
        if (decode) {
          const useradmin = await user.findOne({ _id: decode.id })
          if (useradmin) {
            next()
          }
          else {

            return res.status(400).json({
              Message: "unauthorized user1",
            });
          }
        }
        else {

          return res.status(400).json({
            Message: "unauthorized user2",
          });
        }

      } else {
        return res.status(400).json({
          Message: "unauthorized user while admin check",
        });
      }
    } else {
      return res.status(400).json({
        Message: "unauthorized user3",
      });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  check,
  admincheck,
};
