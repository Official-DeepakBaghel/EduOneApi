const express = require("express");
const router = express.Router();
const { clockIn, clockOut, getMyAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/clock-in", authMiddleware, clockIn);
router.post("/clock-out", authMiddleware, clockOut);
router.get("/my-attendance", authMiddleware, getMyAttendance);

module.exports = router;
