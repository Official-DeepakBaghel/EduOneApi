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

// Add Bus
exports.addBus = async (req, res) => {
    try {
        const { busNumber, routeName, driverName, driverId } = req.body;

        const bus = new Bus({
            busNumber,
            routeName,
            driverName,
            driverId,
            currentLocation: { lat: 0, lng: 0 },
            isTripActive: false
        });

        await bus.save();
        res.status(201).json({ message: "Bus added successfully", bus });
    } catch (error) {
        res.status(500).json({ message: "Error adding bus", error: error.message });
    }
};

// Update Bus
exports.updateBus = async (req, res) => {
    try {
        const { id } = req.params;
        const { busNumber, routeName, driverName, driverId } = req.body;

        const bus = await Bus.findById(id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        bus.busNumber = busNumber || bus.busNumber;
        bus.routeName = routeName || bus.routeName;
        bus.driverName = driverName || bus.driverName;
        bus.driverId = driverId || bus.driverId;

        await bus.save();
        res.json({ message: "Bus updated successfully", bus });
    } catch (error) {
        res.status(500).json({ message: "Error updating bus", error: error.message });
    }
};

// Delete Bus
exports.deleteBus = async (req, res) => {
    try {
        const { id } = req.params;
        const bus = await Bus.findByIdAndDelete(id);
        if (!bus) return res.status(404).json({ message: "Bus not found" });
        res.json({ message: "Bus deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting bus", error: error.message });
    }
};
