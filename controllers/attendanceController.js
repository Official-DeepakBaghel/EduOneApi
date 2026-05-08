const Attendance = require("../models/Attendance");

// Clock In
exports.clockIn = async (req, res) => {
  try {
    const { date, time } = req.body;
    const { id, role } = req.user;

    let attendance = await Attendance.findOne({ user: id, date });

    if (attendance) {
      return res.status(400).json({ message: "Already clocked in for today" });
    }

    attendance = await Attendance.create({
      user: id,
      roleModel: role.charAt(0).toUpperCase() + role.slice(1),
      date,
      clockIn: time,
      status: "Present",
    });

    res.status(201).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clock Out
exports.clockOut = async (req, res) => {
  try {
    const { date, time } = req.body;
    const { id } = req.user;

    let attendance = await Attendance.findOne({ user: id, date });

    if (!attendance) {
      return res.status(400).json({ message: "No clock-in record found for today" });
    }

    attendance.clockOut = time;
    await attendance.save();

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const { id } = req.user;
    const attendance = await Attendance.find({ user: id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
