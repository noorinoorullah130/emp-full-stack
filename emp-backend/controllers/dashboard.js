const Directorate = require("../models/directorate");
const User = require("../models/user");
const Department = require("../models/department");
const Employee = require("../models/employee");
const mongoose = require("mongoose");

const today = new Date();
const fiveDaysAgo = new Date();
fiveDaysAgo.setDate(today.getDate() - 5);
const lastMonthAgo = new Date();
lastMonthAgo.setDate(today.getDate() - 30);

const getDashboardInformation = async (req, res) => {
    try {
        let allDirectorates;
        let allUsers;
        let allDepartments;
        let allEmployees;

        if (req.user.role.includes("admin")) {
            allDirectorates = await Directorate.countDocuments();
            allUsers = await User.countDocuments();
            allDepartments = await Department.countDocuments();
            allEmployees = await Employee.find().sort({ salary: -1 });
        } else {
            allDepartments = await Department.countDocuments({
                directorate: req.user.directorate,
            });
            allEmployees = await Employee.find({
                directorate: req.user.directorate,
            }).sort({ salary: -1 });
        }

        const totalSalary = allEmployees.reduce(
            (currentValue, emp) => currentValue + emp.salary,
            0
        );

        const averageSalary = totalSalary / allEmployees.length;

        const newEmployeesInLastFiveDays = allEmployees.filter(
            (emp) => new Date(emp.hireDate) >= new Date(fiveDaysAgo)
        );

        const newEmployeesInLastMonth = allEmployees.filter(
            (emp) => new Date(emp.hireDate) >= new Date(lastMonthAgo)
        );

        const directorateDetailsOfDashboard = await Directorate.aggregate([
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "directorate",
                    as: "dptsPerDir",
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "directorate",
                    as: "empsPerDir",
                },
            },
            {
                $project: {
                    dirName: 1,
                    dptsPerDir: { $size: "$dptsPerDir" },
                    empsPerDir: { $size: "$empsPerDir" },
                    salaryPerDir: { $sum: "$empsPerDir.salary" },
                },
            },
            {
                $sort: {
                    dptsPerDir: -1,
                    empsPerDir: -1,
                    salaryPerDir: -1,
                },
            },
        ]);

        const departmentDetailsOfDashboard = req.user.role.includes("admin")
            ? await Department.aggregate([
                  {
                      $lookup: {
                          from: "employees",
                          localField: "_id",
                          foreignField: "department",
                          as: "empsPerDpt",
                      },
                  },
                  {
                      $project: {
                          dptName: 1,
                          empsPerDpt: { $size: "$empsPerDpt" },
                          salaryPerDpt: { $sum: "$empsPerDpt.salary" },
                      },
                  },
                  {
                      $sort: {
                          empsPerDpt: -1,
                          salaryPerDpt: -1,
                      },
                  },
              ])
            : await Department.aggregate([
                  {
                      $match: {
                          directorate: new mongoose.Types.ObjectId(
                              req.user.directorate
                          ),
                      },
                  },
                  {
                      $lookup: {
                          from: "employees",
                          localField: "_id",
                          foreignField: "department",
                          as: "empsPerDpt",
                      },
                  },
                  {
                      $project: {
                          dptName: 1,
                          empsPerDpt: { $size: "$empsPerDpt" },
                          salaryPerDpt: { $sum: "$empsPerDpt.salary" },
                      },
                  },
                  {
                      $sort: {
                          empsPerDpt: -1,
                          salaryPerDpt: -1,
                      },
                  },
              ]);

        const gradesCount = allEmployees.reduce((acc, emp) => {
            const found = acc.find((item) => item.grade === emp.grade);

            if (found) {
                found.count += 1;
            } else {
                acc.push({ grade: emp.grade, count: 1 });
            }

            return acc;
        }, []);

        const sortedGradesCount = gradesCount.sort((a, b) => b.count - a.count);

        res.status(200).json({
            ...(req.user.role.includes("admin")
                ? {
                      allDirectorates,
                      allUsers,
                      directorateDetailsOfDashboard,
                  }
                : {}),
            allDepartments,
            allEmployees: allEmployees.length,
            totalSalary,
            averageSalary,
            newEmployeesInLastMonth: newEmployeesInLastMonth.length,
            newEmployeesInLastFiveDays: newEmployeesInLastFiveDays.length,
            departmentDetailsOfDashboard,
            gradesCount: sortedGradesCount,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDashboardInformation;
