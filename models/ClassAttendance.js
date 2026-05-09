const mongoose = require("mongoose");

const classAttendanceSchema = new mongoose.Schema({
    date: { type: String, required: true }, // YYYY-MM-DD
    course: { type: String, required: true },
    subject: { type: String, required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    records: [{
        studentId: { type: String, required: true },
        status: { type: String, enum: ['Present', 'Absent'], default: 'Present' }
    }]
}, { timestamps: true });

classAttendanceSchema.index({ date: 1, course: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model("ClassAttendance", classAttendanceSchema);
