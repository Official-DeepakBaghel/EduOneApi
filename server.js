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


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/clgbunkbanner", require("./routes/bannerRoutes"));
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/buses", require("./routes/busRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/leaves", require("./routes/leaveRoutes"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
