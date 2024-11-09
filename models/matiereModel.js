let mongoose=require('mongoose')

let matiereSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true,
        unique:true
    },
    prix:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('matiere',matiereSchema)