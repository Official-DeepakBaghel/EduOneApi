const Lecture = require("../models/Lecture");
const Student = require("../models/Student");

// Create Lecture
exports.createLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.status(201).json({ success: true, lecture });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Today's Lectures
exports.getTodayLectures = async (req, res) => {
  try {
    const { id, role } = req.user;
    const day = new Date().toLocaleString("en-us", { weekday: "long" });

    let query = { day };

    if (role === "teacher") {
      query.teacher = id;
    } else {
      const student = await Student.findById(id);
      query.course = student.course;
      query.year = student.year;
      query.sem = student.sem;
    }

    const lectures = await Lecture.find(query).sort({ startTime: 1 });

    res.status(200).json({ success: true, lectures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
