const express = require("express");
const router = express.Router();
const { createLecture, getTodayLectures } = require("../controllers/lectureController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createLecture);
router.get("/today", authMiddleware, getTodayLectures);

module.exports = router;
