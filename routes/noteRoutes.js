const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", authMiddleware, upload.single('file'), noteController.uploadNote);
router.get("/", authMiddleware, noteController.getNotes);

module.exports = router;
