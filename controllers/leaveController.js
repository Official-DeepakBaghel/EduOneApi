const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;

        const leave = new Leave({
            user: req.user.id,
            onModel: req.user.role === 'teacher' ? 'Teacher' : 'Student',
            startDate,
            endDate,
            reason
        });

        await leave.save();
        res.status(201).json({ message: "Leave application submitted successfully", leave });
    } catch (error) {
        res.status(500).json({ message: "Error submitting leave application", error: error.message });
    }
};

exports.getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.user.id });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Error fetching leaves", error: error.message });
    }
};

// Admin or Teacher might need to see all leaves or update status
exports.updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
        if (!leave) return res.status(404).json({ message: "Leave application not found" });

        res.json({ message: `Leave application ${status.toLowerCase()}`, leave });
    } catch (error) {
        res.status(500).json({ message: "Error updating leave status", error: error.message });
    }
};
