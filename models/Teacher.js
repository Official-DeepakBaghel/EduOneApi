const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "teacher"
    },
    image: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Teacher", teacherSchema);
