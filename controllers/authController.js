const Student = require("../models/Student.js");
const Teacher = require("../models/Teacher.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
exports.registerUser = async (req, res) => {
    try {
        const { email, password, role, course, year, sem, fatherName, mobileNumber, subjects, department, experience } = req.body;

        // select model based on role
        const Model = role === "teacher" ? Teacher : Student;
        const prefix = role === "teacher" ? "T" : "S";

        // check if email already exists
        const emailExist = await Model.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }


        const lastUser = await Model.findOne()
            .sort({ id: -1 })
            .collation({ locale: "en", numericOrdering: true });

        let nextId = 1001;
        if (lastUser && lastUser.id) {
            const lastIdNum = parseInt(lastUser.id.substring(1));
            if (!isNaN(lastIdNum)) {
                nextId = lastIdNum + 1;
            }
        }

        let generatedId = `${prefix}${nextId}`;

        // Ensure the ID is truly unique (handles race conditions or manual entries)
        let idExists = await Model.findOne({ id: generatedId });
        while (idExists) {
            nextId++;
            generatedId = `${prefix}${nextId}`;
            idExists = await Model.findOne({ id: generatedId });
        }

        // hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const userData = {
            id: generatedId,
            email,
            password: hashedPassword,
            role: role || "student",
            image: req.file ? req.file.path : ""
        };

        // Add student-specific fields if it's a student
        if (role !== "teacher") {
            userData.course = course;
            userData.year = year;
            userData.sem = sem;
            userData.fatherName = fatherName;
            userData.mobileNumber = mobileNumber;
        } else {
            // Add teacher-specific fields
            userData.mobileNumber = mobileNumber;
            userData.subjects = subjects;
            userData.department = department;
            userData.experience = experience;
        }

        const user = await Model.create(userData);

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: `${role} registered successfully`,
            user: userResponse
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//login 
exports.loginUser = async (req, res) => {
    try {
        const { email, id, password } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        // Determine role from ID prefix (S for Student, T for Teacher)
        const firstLetter = id.charAt(0).toUpperCase();
        let Model;
        let roleName;

        if (firstLetter === "S") {
            Model = Student;
            roleName = "student";
        } else if (firstLetter === "T") {
            Model = Teacher;
            roleName = "teacher";
        } else {
            return res.status(400).json({ message: "Invalid ID format (must start with S or T)" });
        }

        // Find user by both id and email
        const userExist = await Model.findOne({ id, email });

        // check user exist or not
        if (!userExist) {
            return res.status(400).json({ message: `Invalid ID/Email or password for ${roleName}` });
        }

        // check password match or not 
        const ismatch = await bcrypt.compare(password, userExist.password);
        if (!ismatch) {
            return res.status(400).json({ message: `Invalid ID/Email or password` });
        }

        // generate token 
        const token = jwt.sign(
            { id: userExist._id, role: userExist.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const userResponse = userExist.toObject();
        delete userResponse.password;

        res.json({
            message: "Login Successfully",
            token,
            user: userResponse
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
