let router=require('express').Router()
let auth=require('../middleware/auth')
let isAdmin=require('../middleware/authRole')
let componentCtrl=require('../controlles/componentCtrl')



router.get('/component',componentCtrl.getAllComponent)
router.post('/component',auth.auhAdmin,isAdmin.Role_Admin,componentCtrl.AjouterComponet)
router.post('/componentId',auth.auhAdmin,isAdmin.Role_Admin,componentCtrl.getComponentById)
router.delete('/component',auth.auhAdmin,isAdmin.Role_Admin,componentCtrl.deleteComponent)
router.put('/component',auth.auhAdmin,isAdmin.Role_Admin,componentCtrl.updateComponent)

module.exports=router