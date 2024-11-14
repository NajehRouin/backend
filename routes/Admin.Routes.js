let router = require("express").Router();

let AdminCtrl = require("../controlles/AdminCtlr");
let auth = require("../middleware/auth");
router.post("/login", AdminCtrl.login);

router.get("/currentadmin", auth.auhAdmin, AdminCtrl.CurrentAdmin);
router.get("/logout", AdminCtrl.logOut);

module.exports = router;
