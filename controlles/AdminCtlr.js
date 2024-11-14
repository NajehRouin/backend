let Admin = require("../models/adminModel");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const { FastMailer } = require("fast-mailer");

const mailer = new FastMailer({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "wafakardamine1999@gmail.com",
    pass: "yfllwihitifjaxgd",
  },
  from: "wafakardamine1999@gmail.com",
  logging: {
    level: "debug",
    format: "text",
    destination: "logging.log",
  },
});

let AdminCtrl = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let findAdmin = await Admin.findOne({ email });
      if (!findAdmin)
        return res.status(302).json({ message: "email incorrect" });

      let isMatch = await bcrypt.compare(password, findAdmin.password);
      if (!isMatch)
        return res.status(302).json({ message: "mot de passe incorrect" });
      const tokenData = {
        _id: findAdmin._id,
        email: findAdmin.email,
      };

      const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      // await mailer.sendMail({
      //   to: "rouin.na71@gmail.com",
      //   subject: "login",
      //   text: "login",
      //   attachments: [
      //     {
      //       filename: "user.png",
      //       path: "upload/analyse/user.png",
      //     },
      //   ],
      // });

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  CurrentAdmin: async (req, res) => {
    try {
      let findAdmin = await Admin.findById(req.admin);
      res.json({
        message: "Current Admin",
        data: findAdmin,
        success: true,
        error: false,
      });
    } catch (err) {
      res.status(400).json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  logOut: async (req, res) => {
    try {
      res.clearCookie("token");

      res.json({
        message: "Logged out successfully",
        error: false,
        success: true,
        data: [],
      });
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },
};

let createAccessToken = (admin) => {
  return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 8,
  });
};

module.exports = AdminCtrl;
