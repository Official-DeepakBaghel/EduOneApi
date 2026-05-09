const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookController.addBook);
router.get("/", authMiddleware, bookController.getBooks);
router.put("/:id", authMiddleware, bookController.updateBook);
router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
