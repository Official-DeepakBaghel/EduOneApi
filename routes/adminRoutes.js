const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, getStats, getTeachers } = require("../controllers/adminController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/stats", authMiddleware, getStats);
router.get("/teachers", authMiddleware, getTeachers);

module.exports = router;
