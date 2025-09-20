const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        fName: { type: String, required: true, trim: true },
        grade: { type: Number, required: true, min: 1, max: 4 },
        step: { type: Number, required: true, min: 1, max: 5 },
        salary: { type: Number },
        experience: { type: Number, required: true },
        department: { type: String, required: true },
        directorate: { type: String, required: true },
        idNumber: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 8,
        },
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
