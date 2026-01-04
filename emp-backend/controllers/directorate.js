const Directorate = require("../models/directorate");
const Employee = require("../models/employee");
const Department = require("../models/department");
const User = require("../models/user");

const addNewDirectorate = async (req, res) => {
    try {
        const { dirCode, dirName } = req.body;

        if (!dirCode || !dirName)
            return res
                .status(400)
                .json({ message: "Directorate code and Name are required!" });

        const isDirectorateExisted = await Directorate.findOne({
            $or: [{ dirCode: dirCode }, { dirName: dirName }],
        });

        if (isDirectorateExisted)
            return res.status(400).json({
                message:
                    "Directorate already existed, See your directorate list!",
            });

        const newDirectorate = new Directorate({
            dirCode,
            dirName,
        });

        await newDirectorate.save();

        console.log(req.user);
        console.log(newDirectorate);

        res.status(201).json({
            message: "New Directorate Added!",
            newDirectorate,
        });
    } catch (error) {
        res.status(500).json({ error: error, error: error.message });
    }
};

const getAllDirectorates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const allDirectorates = await Directorate.find()
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip);

        if (!allDirectorates)
            return res.status(404).json({ message: "No data availabel!" });

        const allDepartments = await Department.find();
        const allEmployees = await Employee.find();

        const allDirectoratesWithDetails = allDirectorates.map((dir) => {
            const dptsInOneDir = allDepartments.filter((dpt) =>
                dpt.directorate.equals(dir._id)
            );

            const empsInOndeDir = allEmployees.filter((emp) =>
                emp.directorate.equals(dir._id)
            );

            const totalSalaryOfDir = empsInOndeDir.reduce(
                (currentValue, emp) => currentValue + emp.salary,
                0
            );

            return {
                ...dir.toObject(),
                allDepartmentsInDir: dptsInOneDir.length,
                allEmployeesInDir: empsInOndeDir.length,
                totalSalaryOfDir,
            };
        });

        const totalDirectorates = await Directorate.countDocuments();

        res.status(200).json({
            allDirectoratesWithDetails,
            page,
            limit,
            skip,
            totalDirectorates,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDirectorate = async (req, res) => {
    try {
        const { dirCode, dirName } = req.body;
        const id = req.params.id;

        if (dirCode || dirName) {
            const isDirectorateExisted = await Directorate.findOne({
                $or: [{ dirCode: dirCode }, { dirName: dirName }],
                _id: { $ne: id },
            });

            if (isDirectorateExisted)
                return res.status(400).json({
                    message: `You cannot update because directorate already existed, See your directorate list!`,
                });
        }

        const updatedDirectorate = await Directorate.findByIdAndUpdate(
            id,
            { $set: { dirCode, dirName } },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Directorate successfully updated!",
            updatedDirectorate,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDirectorate = async (req, res) => {
    try {
        const id = req.params.id;

        // for employees
        const allEmployees = await Employee.find({ directorate: id });

        if (allEmployees.length > 0) {
            return res.status(400).json({
                message: `This directorate has employees to delete first, then you can delete the directorate! Total employees in this Directorate are: ${allEmployees.length}`,
            });
        }

        // for departments
        const allDepartments = await Department.find({ directorate: id });

        if (allDepartments.length > 0) {
            return res.status(400).json({
                message: `This directorate has departments to delete first, then you can delete the directorate! Total departments in this Directorate are: ${allDepartments.length}`,
            });
        }

        // for users
        const allUsers = await User.find({ directorate: id });

        if (allUsers.length > 0) {
            return res.status(400).json({
                message: `This directorate has users to delete first, then you can delete the directorate! Total users in this Directorate are: ${allUsers.length}`,
            });
        }

        const deletedDirectorate = await Directorate.findByIdAndDelete(id);

        if (!deletedDirectorate)
            return res.status(400).json({
                message: `Directorate with ID (${id}) did not existed!`,
            });

        res.status(200).json({
            message: `Directorate of ${deletedDirectorate.dirName} successfully deleted!`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addNewDirectorate,
    getAllDirectorates,
    updateDirectorate,
    deleteDirectorate,
};
