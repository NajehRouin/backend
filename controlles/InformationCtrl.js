let information=require('../models/informationsModel')

let informationCtrl={

    createInformation:async(req,res)=>{
        try {
            let {title,contenu,photo}=req.body
            let findInformation=await information.findOne({title})
            if(findInformation) return res.status(302).json({ msg: "information déja existe" });
            if(!title)  return res.status(302).json({ msg: "title  Obligatoire" });
            if(!contenu)  return res.status(302).json({ msg: "contenu  Obligatoire" });
            if(!photo)  return res.status(302).json({ msg: "photo  Obligatoire" });

            let newInfomation=new information({title,contenu,photo:'/upload/informations/'+photo})
            await newInfomation.save()
            res.status(201).json({
                data : newInfomation,
                success : true,
                error : false,
                message : "information créé avec succès !"
            })
            
        } catch (err) {
            res.json({
                msg : err.message || err  ,
                error : true,
                success : false,
            })
        }
    },
    deletInformation:async(req,res)=>{
        try {
            const {informationId}=req.body
            let findInformation=await information.findByIdAndDelete({_id:informationId})
            res.json({
                data : findInformation,
                success : true,
                error : false
            })
            
        } catch (err) {
            res.json({
                msg : err.message || err  ,
                error : true,
                success : false,
            })
        }
    },
    updateInformation:async(req,res)=>{
        try {
            const {informationId}=req.body
            const payload = {
                ...req.body,
            }

            const updateInformation = await information.findByIdAndUpdate(informationId,payload)
            res.json({
                data : updateInformation,
                message : "Information Updated",
                success : true,
                error : false
            })


        } catch (err) {
            res.json({
                msg : err.message || err  ,
                error : true,
                success : false,
            })
        }
    },

    getInformationById:async(req,res)=>{
        try {
            const {informationId}=req.body
            let findInformation=await information.findById(informationId)
            res.json({
                data : findInformation,
               
                success : true,
                error : false
            })
        } catch (err) {
            res.json({
                msg : err.message || err  ,
                error : true,
                success : false,
            })
        }
    },

    getAllInformation:async(req,res)=>{
        try {
            let findInformations=await information.find()
            res.json({
                data : findInformations,
               
                success : true,
                error : false
            })
            
        } catch (err) {
            res.json({
                msg : err.message || err  ,
                error : true,
                success : false,
            })
        }
    }

}

module.exports=informationCtrl