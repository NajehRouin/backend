const mongoose=require('mongoose')


let informationsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    contenu:{
        type:String,
        required:true,

    },
    photo:{
        type:String,
        required:true
    }

})


module.exports=mongoose.model('information',informationsSchema)