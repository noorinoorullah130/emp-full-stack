const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const verifyToken = require("../middleware/verifyToken");
const Employee = require("../models/employee");

router.get("/", verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const userDirectorateId = new mongoose.Types.ObjectId(
            req.user.directorate
        );

        const fullDetails = await Employee.aggregate([
            { $match: { directorate: userDirectorateId } },
            {
                $group: {
                    _id: "$directorate",
                    uniqueDepartments: { $addToSet: "$department" },
                    totalEmployees: { $sum: 1 },
                    totalSalary: { $sum: "$salary" },
                },
            },
            {
                $project: {
                    totalEmployees: 1,
                    totalSalary: 1,
                    totalDepartmentsCount: { $size: "$uniqueDepartments" },
                    departmentIds: "$uniqueDepartments",
                },
            },
        ]);

        // const employees = await Employee.find({
        //     directorate: userDirectorateId,
        // });

        if (fullDetails.length === 0) {
            return res.status(400).json({ message: "No data available!" });
        }

        res.status(200).json({
            userId,
            userDirectorateId,
            fullDetails,
            // employees,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
