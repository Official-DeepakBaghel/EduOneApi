const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    course: { type: String, required: true },
    subject: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'onModel' },
    onModel: { type: String, required: true, enum: ['Student', 'Teacher'] }
}, { timestamps: true });

noteSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model("Note", noteSchema);
