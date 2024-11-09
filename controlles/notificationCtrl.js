let Notification=require('../models/notificationModel')


let notificationCtrl={


getNotifications : async (req, res) => {
    try {
        const notifications = await Notification.find({ isRead: false }).sort({ createdAt: -1 });
        res.json({
            data : notifications,
            
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


getNotificationNumber:async(req,res)=>{
    try {
        const notifications = await Notification.find({ isRead: false }).sort({ createdAt: -1 });
        res.json({
            data : notifications.length,
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


markNotificationAsRead : async (req, res) => {
    try {
        const { id } = req.body;
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.json({
      
            message : "Notification marked as read",
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

module.exports=notificationCtrl