const Employee = require("../models/employee");
const Department = require("../models/department");

const getDashboardInformation = async (req, res) => {
    try {
        const totalEmployees = await Employee.find();
        const totalDepartments = await Department.countDocuments();

        const now = new Date();
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(now.getDate() - 5);

        const newEmpsInTheLastFiveDays = await Employee.find({
            createdAt: { $gte: fiveDaysAgo, $lte: now },
        }).countDocuments();

        let totalSalary = 0;

        totalEmployees.forEach((emp) => {
            totalSalary = totalSalary + emp.salary;
        });

        res.status(200).json({
            totalEmployees: totalEmployees.length,
            totalDepartments,
            newEmpsInTheLastFiveDays,
            totalSalary,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDashboardInformation;
