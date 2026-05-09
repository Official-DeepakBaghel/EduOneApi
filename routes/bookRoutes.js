const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookController.addBook);
router.get("/", authMiddleware, bookController.getBooks);

module.exports = router;
