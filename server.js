const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/clgbunkbanner", require("./routes/bannerRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/lecture", require("./routes/lectureRoutes"));
app.use("/api/leave", require("./routes/leaveRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));