const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, leaveController.applyLeave);
router.get("/my", authMiddleware, leaveController.getMyLeaves);
router.put("/:id/status", authMiddleware, leaveController.updateLeaveStatus);

module.exports = router;
