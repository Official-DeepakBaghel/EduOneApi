const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const Note = require("../models/Note.js");

// Register Admin
exports.registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailExist = await Admin.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const lastAdmin = await Admin.findOne().sort({ id: -1 });
        let nextId = 1001;
        if (lastAdmin && lastAdmin.id) {
            const lastIdNum = parseInt(lastAdmin.id.substring(1));
            if (!isNaN(lastIdNum)) {
                nextId = lastIdNum + 1;
            }
        }
        const generatedId = `A${nextId}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            id: generatedId,
            email,
            password: hashedPassword,
            role: "admin"
        });

        const adminResponse = admin.toObject();
        delete adminResponse.password;

        res.status(201).json({
            message: "Admin registered successfully",
            user: adminResponse
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    try {
        const { email, id, password } = req.body;

        const admin = await Admin.findOne({ id, email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid ID/Email or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid ID/Email or password" });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const adminResponse = admin.toObject();
        delete adminResponse.password;

        res.json({
            message: "Admin Login Successfully",
            token,
            user: adminResponse
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// Get Dashboard Stats
exports.getStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalNotes = await Note.countDocuments();

        res.json({
            totalUsers: totalStudents + totalTeachers,
            activeTeachers: totalTeachers,
            totalNotes: totalNotes,
            engagementRate: "75%"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Teachers
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().select("-password");
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
