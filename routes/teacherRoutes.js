const express = require("express");
const router = express.Router();
const {
    clockIn,
    clockOut,
    getOwnAttendance,
    getStudentsByClass,
    getSubjects,
    getBunkList,
    getProfile,
    changePassword
} = require("../controllers/teacherController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Middleware to check if user is a teacher
const isTeacher = (req, res, next) => {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access denied. Teachers only." });
    }
    next();
};

// All routes here require authentication and teacher role
router.use(authMiddleware);
router.use(isTeacher);

router.post("/clock-in", clockIn);
router.post("/clock-out", clockOut);
router.get("/my-attendance", getOwnAttendance);
router.get("/students/:classId", getStudentsByClass);
router.get("/subjects", getSubjects);
router.get("/bunklist", getBunkList);
router.get("/profile", getProfile);
router.post("/change-password", changePassword);

module.exports = router;
