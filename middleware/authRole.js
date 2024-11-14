let Admin = require("../models/adminModel");
let User=require('../models/userModel')
let verifyRole = {
  Role_Admin: async (req, res, next) => {
    try {
      let admin = await Admin.findById(req.admin).exec();

      if (!admin)
        return res.status(400).json({ msg: " admin resource acces denied." });
      next();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  Role_User: async (req, res, next) => {
    try {
      let user = await User.findById(req.user.id).exec();

      if (!user)
        return res.status(400).json({ msg: " user resource acces denied." });
      next();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = verifyRole;
