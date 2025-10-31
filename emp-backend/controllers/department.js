const Department = require("../models/department");
const Directorate = require("../models/directorate");
const Employee = require("../models/employee");

const addNewDpt = async (req, res) => {
    try {
        const { dptName, dptManager, directorate } = req.body;
        const directorateIdFromUser = req.user.directorate;

        if (!dptName || !dptManager) {
            return res
                .status(400)
                .json({ message: "Required fields are missing!" });
        }

        const isDepartmentExist = await Department.findOne({
            dptName: dptName,
        });

        if (isDepartmentExist)
            return res
                .status(400)
                .json({ message: "Department already existed!" });

        let directorateIdFromAdmin;

        if (req.user.role.includes("admin")) {
            directorateIdFromAdmin = await Directorate.findOne({
                dirName: directorate,
            }).select("_id");

            if (!directorateIdFromAdmin)
                return res.status(400).json({
                    message: "Directorate id has not comes from admin!",
                });
        }

        const dptData = {
            dptName,
            dptManager,
            directorate: req.user.role.includes("admin")
                ? directorateIdFromAdmin
                : directorateIdFromUser,
        };

        const newDpt = new Department(dptData);
        await newDpt.save();

        res.status(201).json({ message: "New Department Created!", newDpt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDpts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        // const userId = req.user.role.includes("admin")

        const allDpts = req.user.role.includes("admin")
            ? await Department.find().sort({ _id: -1 }).limit(limit).skip(skip)
            : await Department.find({
                  directorate: req.user.directorate,
              })
                  .sort({ _id: -1 })
                  .limit(limit)
                  .skip(skip);

        const totalDpts = req.user.role.includes("admin")
            ? await Department.countDocuments()
            : await Department.countDocuments({
                  directorate: req.user.directorate,
              });

        const empPerDepartments = await Promise.all(
            allDpts.map(async (dpt) => {
                const allEmployees = await Employee.find({
                    department: dpt._id,
                });

                const employeeCountPerDpt = allEmployees.length;

                let totalSalaryPerDpt = 0;

                allEmployees.forEach((emp) => {
                    totalSalaryPerDpt = totalSalaryPerDpt + emp.salary;
                });

                return {
                    department: dpt.dptName,
                    employeeCountPerDpt,
                    totalSalaryPerDpt,
                };
            })
        );

        res.status(200).json({
            page,
            limit,
            skip,
            allDpts,
            empPerDepartments,
            totalDpts,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDpt = async (req, res) => {
    try {
        const { dptName, dptManager } = req.body;

        const id = req.params.id;

        const department = await Department.findById(id);

        if (!department)
            return res
                .status(404)
                .json({ message: `Department with id(${id}) not found!` });

        if (dptName) {
            const isDptExisted = await Department.findOne({
                dptName: dptName,
                _id: { $ne: id },
            });

            if (isDptExisted)
                return res
                    .status(400)
                    .json({ message: "Department already existed!" });
        }

        const updatedDpt = await Department.findByIdAndUpdate(
            id,
            {
                $set: { dptName, dptManager },
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: `Department with id(${id}) successfully edited!`,
            updatedDpt,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDpt = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedDpt = await Department.findByIdAndDelete(id);

        if (!deletedDpt)
            return res
                .status(400)
                .json({ message: `Department with id(${id} not found!)` });

        res.status(200).json({
            message: `Department with id(${id}) successfully deleted!`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addNewDpt, getAllDpts, updateDpt, deleteDpt };
