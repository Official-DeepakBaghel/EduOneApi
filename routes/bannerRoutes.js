const express = require("express");
const router = express.Router();
const { addBanner, getBanners } = require("../controllers/bannerController.js");

router.post("/add", addBanner);
router.get("/", getBanners);

module.exports = router;
