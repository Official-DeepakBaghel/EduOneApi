const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createBanner,
  getBanners,
  deleteBanner,
} = require("../controllers/bannerController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/create", upload.single("image"), createBanner);
router.get("/list", getBanners);
router.delete("/delete/:id", deleteBanner);

module.exports = router;
