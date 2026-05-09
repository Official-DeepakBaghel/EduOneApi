const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, busController.getBuses);
router.post("/:id/trip/start", authMiddleware, busController.startTrip);
router.post("/:id/trip/end", authMiddleware, busController.endTrip);
router.put("/:id/location", authMiddleware, busController.updateLocation);

module.exports = router;
