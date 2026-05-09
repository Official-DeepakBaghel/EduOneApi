const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true
    },
    clockIn: {
        type: String // HH:MM:SS
    },
    clockOut: {
        type: String // HH:MM:SS
    },
    status: {
        type: String,
        default: "Present"
    }
}, {
    timestamps: true
});

// Ensure unique attendance record per user per day
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
