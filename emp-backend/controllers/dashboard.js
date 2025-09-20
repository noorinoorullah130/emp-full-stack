const Directorate = require("../models/directorate");
const Department = require("../models/department");
const Employee = require("../models/employee");

const getDashboardInformation = async (req, res) => {
    const now = new Date();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(now.getDate() - 5);

    console.log(req);

    try {
        if (req.user.role.includes("admin")) {
            // For Admin
            const totalDirectorates = await Directorate.find();
            const totalDepartments = await Department.countDocuments();
            const totalEmployees = await Employee.find();

            const newEmpsInTheLastFiveDays = await Employee.find({
                createdAt: { $gte: fiveDaysAgo, $lte: now },
            }).countDocuments();

            let totalSalary = 0;

            totalEmployees.forEach((emp) => {
                totalSalary = totalSalary + emp.salary;
            });

            res.status(200).json({
                totalDirectorates: totalDirectorates.length,
                totalDepartments,
                totalEmployees: totalEmployees.length,
                newEmpsInTheLastFiveDays,
                totalSalary,
            });
        } else if (req.user.role.includes("user")) {
            // For User
            const totalDepartments = await Department.countDocuments({
                directorate: req.user.directorate,
            });
            const totalEmployees = await Employee.find({
                directorate: req.user.directorate,
            });

            const newEmpsInTheLastFiveDays = await Employee.find({
                createdAt: {
                    $gte: fiveDaysAgo,
                    $lte: now,
                },
                directorate: req.user.directorate,
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
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDashboardInformation;
