const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Directorate = require("../models/directorate");
const Department = require("../models/department");
const Employee = require("../models/employee");

const today = new Date();
const fiveDaysAgo = new Date();
fiveDaysAgo.setDate(today.getDate() - 5);

router.get("/", async (req, res) => {
    try {
        const allUsers = await User.countDocuments();
        const allDirectorates = await Directorate.countDocuments();
        const allDepartments = await Department.countDocuments();
        const allEmployees = await Employee.find();

        const totalEmployeesSalary = allEmployees.reduce(
            (currentValue, emp) => currentValue + emp.salary,
            0
        );

        const newEmpsInTheLastFiveDays = allEmployees.filter(
            (emp) => new Date(emp.hireDate) >= fiveDaysAgo
        );

        const allDepartmentsWithDetails = await Department.aggregate([]).sort({
            _id: -1,
        });

        res.status(200).json({
            message: "Start!",
            // allUsers,
            // allDirectorates,
            // allDepartments,
            // totalEMployees: allEmployees.length,
            // totalEmployeesSalary,
            // newEmpsInTheLastFiveDays: newEmpsInTheLastFiveDays.length,
            // fiveDaysAgo: typeof fiveDaysAgo,
            allDepartmentsWithDetails,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
