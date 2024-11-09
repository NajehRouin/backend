const mongoose=require('mongoose')

let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    cin:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    numPhone:{
        type:String,
        required:true
    },
    photo:{
        type:String,
       default:'/upload/photo_profil/user.png'
    },
    status:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
    }
})

module.exports=mongoose.model('user',userSchema)