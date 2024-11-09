let router=require('express').Router()
let auth=require('../middleware/auth')
let isAdmin=require('../middleware/authRole')
let isUser=require('../middleware/authRole')

let analyseCtrl=require('../controlles/analyseCtrl')

router.get('/all-analyse',auth.auhAdmin,isAdmin.Role_Admin,analyseCtrl.getAllAnaylse)
router.get('/analyse-user',auth.auhUser,isUser.Role_User,analyseCtrl.getAllAnalyseByUser)
router.post('/analyse',auth.auhUser,isUser.Role_User,analyseCtrl.createAnalyse)

router.post('/detaill-analyse',analyseCtrl.getAnalyseById)

router.put('/paiement-analyse',auth.auhUser,isUser.Role_User,analyseCtrl.PaiementAnalyse)
router.put('/accepte-paiement',auth.auhAdmin,isAdmin.Role_Admin,analyseCtrl.AcceptePaiement)
router.put('/envoyer-analyse',auth.auhAdmin,isAdmin.Role_Admin,analyseCtrl.envoyerAnalyse)


module.exports=router


