let router = require("express").Router();
let auth = require("../middleware/auth");
let isAdmin = require("../middleware/authRole");

let notificationCtrl = require("../controlles/notificationCtrl");

router.get(
  "/notifications",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  notificationCtrl.getNotificationsUser
);

router.get(
  "/notificationsdemande",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  notificationCtrl.getNotificationsDemande
);

router.get(
  "/notificationspaiement",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  notificationCtrl.getNotificationsPaiement
);

router.get(
  "/notifications-number",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  notificationCtrl.getNotificationUserNumber
);

router.get(
  "/notificationsdemandenumber",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  notificationCtrl.getNotificationDemandeNumber
);

router.get(
  "/notificationspaiementnumber",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  notificationCtrl.getNotificationPaiementNumber
);

router.put(
  "/notification",
  auth.auhAdmin,
  isAdmin.Role_Admin,
  notificationCtrl.markNotificationAsRead
);

module.exports = router;
