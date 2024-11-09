let mongoose=require('mongoose')


let componentSchema=new mongoose.Schema({
        component:{
            type:String,
            required:true
        },
        matiere:{
            type:mongoose.Types.ObjectId,
            ref:'matiere'
        },
        prix:{
            type:Number,
            required:true
        }
})

module.exports=mongoose.model('component_material',componentSchema)