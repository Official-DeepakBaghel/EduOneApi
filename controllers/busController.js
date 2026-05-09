const Bus = require("../models/Bus");

exports.getBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching buses", error: error.message });
    }
};

exports.startTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const bus = await Bus.findByIdAndUpdate(id, { isTripActive: true }, { new: true });
        if (!bus) return res.status(404).json({ message: "Bus not found" });
        res.json({ message: "Trip started", bus });
    } catch (error) {
        res.status(500).json({ message: "Error starting trip", error: error.message });
    }
};

exports.endTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const bus = await Bus.findByIdAndUpdate(id, { isTripActive: false }, { new: true });
        if (!bus) return res.status(404).json({ message: "Bus not found" });
        res.json({ message: "Trip ended", bus });
    } catch (error) {
        res.status(500).json({ message: "Error ending trip", error: error.message });
    }
};

exports.updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { lat, lng } = req.body;
        const bus = await Bus.findByIdAndUpdate(id, { currentLocation: { lat, lng } }, { new: true });
        if (!bus) return res.status(404).json({ message: "Bus not found" });
        res.json({ message: "Location updated", bus });
    } catch (error) {
        res.status(500).json({ message: "Error updating location", error: error.message });
    }
};
