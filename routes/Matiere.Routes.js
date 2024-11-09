let router=require('express').Router()
let auth=require('../middleware/auth')
let isAdmin=require('../middleware/authRole')

let matiereCtrl=require('../controlles/matiereCtlr')

router.get('/matiere',matiereCtrl.getAllMatier)
router.post('/matiere',auth.auhAdmin,isAdmin.Role_Admin,matiereCtrl.AjouterMatiere)
router.post('/matierId',auth.auhAdmin,isAdmin.Role_Admin,matiereCtrl.getMatierByID)
router.put('/matiere',auth.auhAdmin,isAdmin.Role_Admin,matiereCtrl.ModifierMatier)
router.delete('/matiere',auth.auhAdmin,isAdmin.Role_Admin,matiereCtrl.deleteMatier)

module.exports=router