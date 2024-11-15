let userCtrl = require("../controlles/UserCtlr");

let router = require("express").Router();
let auth = require("../middleware/auth");
let isAdmin = require("../middleware/authRole");

router.post("/register", userCtrl.register);
router.post("/login-user", userCtrl.login);
router.get("/currentUser", auth.auhUser, userCtrl.currentUser);

router.get("/users", auth.auhAdmin, isAdmin.Role_Admin, userCtrl.getAllUser);
router.post(
  "/acceptUser",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  userCtrl.acceptUser
);

router.put(
  "/updateProfil",
  auth.auhUser,
  isAdmin.Role_User,
  userCtrl.updateProfil
);

router.put(
  "/updatePassWord",
  auth.auhUser,
  isAdmin.Role_User,
  userCtrl.updatePassWord
);

router.post("/forgetpass", userCtrl.forgetPassword);
module.exports = router;
