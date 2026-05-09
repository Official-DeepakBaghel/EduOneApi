const Teacher = require("../models/Teacher.js");
const Student = require("../models/Student.js");
const Attendance = require("../models/Attendance.js");
const bcrypt = require("bcrypt");

// Clock In (Teacher)
exports.clockIn = async (req, res) => {
    try {
        const teacherId = req.user.id; // Assuming ID from token
        const date = new Date().toISOString().slice(0, 10);
        const time = new Date().toTimeString().slice(0, 8);

        let attendance = await Attendance.findOne({ userId: teacherId, date });

        if (attendance) {
            return res.status(400).json({ message: "Already clocked in today" });
        }

        attendance = await Attendance.create({
            userId: teacherId,
            date,
            clockIn: time,
            status: "Present"
        });

        res.status(201).json({ message: "Clocked in successfully", attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clock Out (Teacher)
exports.clockOut = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const date = new Date().toISOString().slice(0, 10);
        const time = new Date().toTimeString().slice(0, 8);

        const attendance = await Attendance.findOne({ userId: teacherId, date });

        if (!attendance) {
            return res.status(400).json({ message: "Not clocked in today" });
        }

        if (attendance.clockOut) {
            return res.status(400).json({ message: "Already clocked out today" });
        }

        attendance.clockOut = time;
        await attendance.save();

        res.json({ message: "Clocked out successfully", attendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Teacher Own Attendance
exports.getOwnAttendance = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const attendance = await Attendance.find({ userId: teacherId });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Class Students by Class ID
exports.getStudentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const students = await Student.find({ classId });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Assigned Subjects
exports.getSubjects = async (req, res) => {
    try {
        const teacherId = req.user.id;
        // The user.id in token is usually the MongoDB _id or the generated ID (T1001).
        // Let's check both or assume it's the generated ID based on authController.js line 127: { id: userExist._id, role: userExist.role }
        // Wait, line 127 uses `_id`! So `req.user.id` is the MongoDB ObjectId.
        // Let's fetch the teacher by _id.
        const teacher = await Teacher.findById(req.user.id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json({ subjects: teacher.subjects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View Bunk List (Mock implementation returning some students as bunking)
exports.getBunkList = async (req, res) => {
    try {
        const { classId } = req.query; // Or params
        const students = await Student.find({ classId });

        // Mocking bunk status for demonstration
        const bunkList = students.map((student, index) => ({
            ...student.toObject(),
            isBunking: index % 2 === 0 // Mock: every even student is bunking
        })).filter(s => s.isBunking);

        res.json(bunkList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Teacher Profile
exports.getProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id).select("-password");
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const teacher = await Teacher.findById(req.user.id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid old password" });
        }

        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(newPassword, salt);
        await teacher.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
