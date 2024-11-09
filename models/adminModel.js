let mongoose =require('mongoose')

let AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
            type:String,
            default:'/upload/photo_profil/user.png'
    },
    role:{
        type:String,
        default:"admin"
    }
})

module.exports=mongoose.model('admin',AdminSchema)