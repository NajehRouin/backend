let user = require("../models/userModel");
let notification = require("../models/notificationModel");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let userCtrl = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let findUser = await user.findOne({ email });
      if (!findUser) return res.status(302).json({ msg: "email incorrect" });
      if (!findUser.status)
        return res
          .status(302)
          .json({ msg: "L'administrateur n'a pas activé votre compte" });
      let isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch)
        return res.status(302).json({ msg: "mot de passe incorrect" });

      let accessToken = createAccessToken({ id: findUser._id });
      res.json({ user: findUser, accessToken });
    } catch (err) {
      res.json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },

  register: async (req, res) => {
    try {
      let { name, email, cin, password, numPhone, photo } = req.body;

      const findUser = await user.findOne({ email });

      if (findUser) return res.status(302).json({ msg: "user déja existe" });
      if (!name) return res.status(302).json({ msg: "nom  Obligatoire" });
      if (!email) return res.status(302).json({ msg: "email Obligatoire" });
      if (!cin) return res.status(302).json({ msg: "cin Obligatoire" });
      if (!password)
        return res.status(302).json({ msg: "mot de passe Obligatoire" });
      if (!numPhone)
        return res.status(302).json({ msg: "numero télephone Obligatoire" });
      const hashPassword = await bcrypt.hash(password, 10);
      let urlPhoto = "";
      if (photo === "") {
        urlPhoto = "/upload/photo_profil/user.png";
      } else {
        urlPhoto = "/upload/photo_profil/" + photo;
      }

      const userData = new user({
        name,
        email,
        cin,
        password: hashPassword,
        numPhone,
        photo: urlPhoto,
      });
      const saveUser = await userData.save();

      // Create a notification for the admin
      const newNotification = new notification({
        message: `${name}`,
        typeNotifiaction: "nouveau compte",
      });
      await newNotification.save();

      res.status(201).json({
        data: saveUser,
        success: true,
        error: false,
        message: "User créé avec succès !",
      });
    } catch (err) {
      res.json({
        msg: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  currentUser: async (req, res) => {
    try {
      const findUser = await user.findById(req.user.id);

      res.json({
        message: "Current User",
        data: findUser,
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

  getAllUser: async (req, res) => {
    try {
      let findUsers = await user.find().select("-password -role");
      res.json({
        message: "All Users",
        data: findUsers,
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

  acceptUser: async (req, res) => {
    try {
      const { userId } = req.body;
      let finduser = await user.findById(userId);

      if (finduser.status === false) {
        const updateUser = await user.findByIdAndUpdate(userId, {
          status: true,
        });
        res.json({
          data: updateUser,
          message: "compte user est activé",
          success: true,
          error: false,
        });
      } else {
        const updateUser = await user.findByIdAndUpdate(userId, {
          status: false,
        });
        res.json({
          data: updateUser,
          message: "compte user est desactivé",
          success: true,
          error: false,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },
  updateProfil: async (req, res) => {
    try {
      const findUser = await user.findById(req.user.id);
      let { name, email, cin, numPhone, photo } = req.body;
      let urlPhoto = "";
      if (photo === findUser.photo) {
        urlPhoto = photo;
      } else {
        urlPhoto = "/upload/photo_profil/" + photo;
      }
      await user.findByIdAndUpdate(
        { _id: findUser._id },
        { name, email, cin, numPhone, photo: urlPhoto }
      );

      res.status(201).json({
        success: true,
        error: false,
        message: "votre Profile modifer avec succès !",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  },
};

let createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = userCtrl;
