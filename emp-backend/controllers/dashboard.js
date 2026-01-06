const Directorate = require("../models/directorate");
const User = require("../models/user");
const Department = require("../models/department");
const Employee = require("../models/employee");

const today = new Date();
const fiveDaysAgo = new Date();
fiveDaysAgo.setDate(today.getDate() - 5);
const lastMonthAgo = new Date();
lastMonthAgo.setDate(today.getDate() - 30);

const getDashboardInformation = async (req, res) => {
    try {
        const allDirectorates = await Directorate.countDocuments();
        const allUsers = await User.countDocuments();
        const allDepartments = await Department.countDocuments();
        const allEmployees = await Employee.find();

        const totalSalary = allEmployees.reduce(
            (currentValue, emp) => currentValue + emp.salary,
            0
        );

        const averageSalary = (totalSalary / allEmployees.length).toFixed(2);

        const newEmployeesInLastFiveDays = allEmployees.filter(
            (emp) => new Date(emp.hireDate) >= new Date(fiveDaysAgo)
        );

        const newEmployeesInLastMonth = allEmployees.filter(
            (emp) => new Date(emp.hireDate) >= new Date(lastMonthAgo)
        );

        const fullDetails = await Directorate.aggregate([
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "directorate",
                    as: "departmentCount",
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "directorate",
                    as: "employees",
                },
            },
        ]);

        res.status(200).json({
            allDirectorates,
            allUsers,
            allDepartments,
            allEmployees: allEmployees.length,
            totalSalary,
            averageSalary,
            newEmployeesInLastMonth: newEmployeesInLastMonth.length,
            newEmployeesInLastFiveDays: newEmployeesInLastFiveDays.length,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDashboardInformation;
