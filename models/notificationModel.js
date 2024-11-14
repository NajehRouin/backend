let mongoose = require("mongoose");

let notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  typeNotifiaction: {
    type: String,
    enum: ["nouveau compte", "demande", "paiement"],
    default: "nouveau compte",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notification", notificationSchema);
