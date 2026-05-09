const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", authMiddleware, upload.single('file'), noteController.uploadNote);
router.get("/", authMiddleware, noteController.getNotes);
router.put("/:id", authMiddleware, noteController.updateNote);
router.delete("/:id", authMiddleware, noteController.deleteNote);

module.exports = router;
