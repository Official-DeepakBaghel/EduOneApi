const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    recipientId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'recipientModel' },
    recipientModel: { type: String, required: true, enum: ['Student', 'Teacher'] },
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: { type: String, enum: ['assignment', 'note', 'announcement', 'result'], default: 'announcement' },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
