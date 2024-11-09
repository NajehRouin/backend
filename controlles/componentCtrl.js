let Component=require('../models/componentModel')



let componentCtrl={
        AjouterComponet:async(req,res)=>{
            try {
                let {component,matiere,prix}=req.body
                if(!component) return res.status(302).json({ msg: "component  Obligatoire" });

                if(!matiere) return res.status(302).json({ msg: "matiere  Obligatoire" });
                if(!prix) return res.status(302).json({ msg: "prix  Obligatoire" });
                const existingComponent = await Component.findOne({ component, matiere });

                if (existingComponent) {
                    return res.status(409).json({
                        msg: "component déja existe",
                        error: true,
                        success: false,
                    });
                }

                let newComponet=new Component({component,matiere,prix})
                await newComponet.save()
                res.status(201).json({
                    data : newComponet,
                    success : true,
                    error : false,
                    message : "component créé avec succès !"
                })
            } catch (err) {
                res.json({
                    msg : err.message || err  ,
                    error : true,
                    success : false,
                })
            }
        },
        getAllComponent:async(req,res)=>{
            try {
                let findComponent=await Component.find().populate('matiere')
                res.status(201).json({
                    data : findComponent,
                    success : true,
                    error : false,
                
                })
            } catch (err) {
                res.json({
                    msg : err.message || err  ,
                    error : true,
                    success : false,
                })
            }
        },
        getComponentById:async(req,res)=>{
            try {
                let {componentId}=req.body
                let findComponet=await Component.findById(componentId)
                res.status(201).json({
                    data : findComponet,
                    success : true,
                    error : false,
                })
            } catch (err) {
                res.json({
                    msg : err.message || err  ,
                    error : true,
                    success : false,
                })
            }
        },

        deleteComponent:async(req,res)=>{
            try {
                let {componentId}=req.body
                let findComponent=await Component.findByIdAndDelete(componentId)
                res.json({
                    data : findComponent,
                    message : "component Deleted",
                    success : true,
                    error : false
                })
            }catch (err) {
                res.json({
                    msg : err.message || err  ,
                    error : true,
                    success : false,
                })
            }
        },

        updateComponent:async(req,res)=>{
            try {
                let {componentId,component,matiere,prix}=req.body
                if(!component) return res.status(302).json({ msg: "component  Obligatoire" });

                if(!matiere) return res.status(302).json({ msg: "matiere  Obligatoire" });
                if(!prix) return res.status(302).json({ msg: "prix  Obligatoire" });
                const payload = {
                    ...req.body,
                }

                const updateComponent = await Component.findByIdAndUpdate(componentId,payload)
                res.json({
                    data : updateComponent,
                    message : "updateComponent Updated",
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

module.exports=componentCtrl