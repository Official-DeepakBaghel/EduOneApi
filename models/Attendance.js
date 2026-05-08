const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "roleModel",
      required: true,
    },
    roleModel: {
      type: String,
      required: true,
      enum: ["Student", "Teacher"],
    },
    date: {
      type: String, // format: YYYY-MM-DD
      required: true,
    },
    clockIn: {
      type: String, // format: HH:mm AM/PM
    },
    clockOut: {
      type: String, // format: HH:mm AM/PM
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Sunday", "Holiday"],
      default: "Present",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
