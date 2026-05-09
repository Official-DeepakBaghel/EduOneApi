const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    busNumber: { type: String, required: true, unique: true },
    routeName: { type: String, required: true },
    driverName: { type: String, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    isTripActive: { type: Boolean, default: false },
    currentLocation: {
        lat: { type: Number },
        lng: { type: Number }
    }
}, { timestamps: true });

module.exports = mongoose.model("Bus", busSchema);
