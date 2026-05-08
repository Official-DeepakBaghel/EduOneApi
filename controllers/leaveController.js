const Leave = require("../models/Leave");

// Apply for Leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const { id, role } = req.user;

    const leave = await Leave.create({
      user: id,
      roleModel: role.charAt(0).toUpperCase() + role.slice(1),
      leaveType,
      startDate,
      endDate,
      reason,
    });

    res.status(201).json({ success: true, message: "Leave application submitted", leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const { id } = req.user;
    const leaves = await Leave.find({ user: id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
