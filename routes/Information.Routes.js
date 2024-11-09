let router=require('express').Router()
let informationCtrl=require('../controlles/InformationCtrl')
let auth=require('../middleware/auth')
let isAdmin=require('../middleware/authRole')



router.get('/information',informationCtrl.getAllInformation)
router.post('/information',auth.auhAdmin,isAdmin.Role_Admin,informationCtrl.createInformation)
router.post('/getByID',auth.auhAdmin,isAdmin.Role_Admin,informationCtrl.getInformationById)
router.put('/information',auth.auhAdmin,isAdmin.Role_Admin,informationCtrl.updateInformation)
router.delete('/information',auth.auhAdmin,isAdmin.Role_Admin,informationCtrl.deletInformation)


module.exports=router