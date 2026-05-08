const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
        default: "student"
    },
    image: {
        type: String,
        default: ""
    },
    course: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
