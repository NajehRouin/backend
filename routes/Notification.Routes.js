let router=require('express').Router()
let auth=require('../middleware/auth')
let isAdmin=require('../middleware/authRole')

let notificationCtrl=require('../controlles/notificationCtrl')

router.get('/notifications',auth.auhAdmin,isAdmin.Role_Admin,notificationCtrl.getNotifications)
router.get('/notifications-number',auth.auhAdmin,isAdmin.Role_Admin,notificationCtrl.getNotificationNumber)


router.put('/notification',auth.auhAdmin,isAdmin.Role_Admin,notificationCtrl.markNotificationAsRead)


module.exports=router