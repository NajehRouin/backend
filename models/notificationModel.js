let mongoose=require('mongoose')


let notificationSchema=new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports=mongoose.model('notification',notificationSchema)