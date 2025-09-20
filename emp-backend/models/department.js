const mongoose = require("mongoose");

const dptSchema = new mongoose.Schema(
    {
        dptName: { type: String, required: true },
        dptManager: { type: String, required: true },
    },
    { timestamps: true }
);

const Department = mongoose.model("Department", dptSchema);

module.exports = Department;
