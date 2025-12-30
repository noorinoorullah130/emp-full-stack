const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, lowercase: true },
        fName: { type: String, required: true, trim: true, lowercase: true },
        grade: { type: Number, required: true, min: 1, max: 4 },
        step: { type: Number, required: true, min: 1, max: 5 },
        salary: { type: Number },
        experience: { type: Number, required: true },
        department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
        directorate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Directorate",
        },
        idNumber: {
            type: String,
            required: true,
            minLength: 15,
            maxLength: 15,
        },
        inrollDate: { type: String, required: true },
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
