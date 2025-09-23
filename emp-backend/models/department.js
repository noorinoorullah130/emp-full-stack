const mongoose = require("mongoose");

const dptSchema = new mongoose.Schema(
    {
        dptName: { type: String, required: true, trim: true, lowercase: true },
        dptManager: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        directorate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Directorate",
        },
    },
    { timestamps: true }
);

const Department = mongoose.model("Department", dptSchema);

module.exports = Department;
