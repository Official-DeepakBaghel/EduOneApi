const Attendance = require("../models/Attendance");
const ClassAttendance = require("../models/ClassAttendance");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

exports.clockIn = async (req, res) => {
    try {
        const Model = req.user.role === 'teacher' ? Teacher : Student;
        const user = await Model.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const userId = user.id; // String ID like S1001
        const date = new Date().toISOString().slice(0, 10);
        const clockIn = new Date().toLocaleTimeString();

        let attendance = await Attendance.findOne({ userId, date });
        if (attendance) {
            return res.status(400).json({ message: "Already clocked in today" });
        }

        attendance = new Attendance({ userId, date, clockIn });
        await attendance.save();

        res.status(201).json({ message: "Clocked in successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error clocking in", error: error.message });
    }
};

exports.clockOut = async (req, res) => {
    try {
        const Model = req.user.role === 'teacher' ? Teacher : Student;
        const user = await Model.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const userId = user.id;
        const date = new Date().toISOString().slice(0, 10);
        const clockOut = new Date().toLocaleTimeString();

        const attendance = await Attendance.findOne({ userId, date });
        if (!attendance) {
            return res.status(404).json({ message: "No clock-in record found for today" });
        }

        attendance.clockOut = clockOut;
        await attendance.save();

        res.json({ message: "Clocked out successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error clocking out", error: error.message });
    }
};

exports.submitBulkAttendance = async (req, res) => {
    try {
        const { date, course, subject, records } = req.body;

        const attendance = new ClassAttendance({
            date,
            course,
            subject,
            markedBy: req.user.id,
            records
        });

        await attendance.save();
        res.status(201).json({ message: "Attendance submitted successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error submitting attendance", error: error.message });
    }
};
