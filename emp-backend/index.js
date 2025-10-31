const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const dptRoutes = require("./routes/department");
const empRoutes = require("./routes/employee");
const settingRoutes = require("./routes/setting");
const dashboardRoutes = require("./routes/dashboard");
const directorateRoutes = require("./routes/directorate");
const aggregateMethod = require("./training/aggregateMethod");

const app = express();

mongoose
    .connect("mongodb://localhost:27017/employee-management")
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log("MongoDB connection failed", err));

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/directorate", directorateRoutes);
app.use("/api/department", dptRoutes);
app.use("/api/employee", empRoutes);
app.use("/api/setting", settingRoutes);

// app.use("/api/aggregate", aggregateMethod);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}...`);
});
