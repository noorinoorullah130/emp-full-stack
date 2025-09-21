const Directorate = require("../models/directorate");
const Employee = require("../models/employee");

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
                message: "Directorate code or Name already existed!",
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

        const totalDirectorates = await Directorate.countDocuments();
        const totalPages = Math.ceil(totalDirectorates / limit);

        const empPerDirectorate = await Promise.all(
            allDirectorates.map(async (dir) => {
                const allEmployees = await Employee.find({
                    directorate: dir._id,
                });

                const employeeCountPerDirectorate = allEmployees.length;

                let totalSalaryPerDirectorate = 0;

                allEmployees.forEach((emp) => {
                    totalSalaryPerDirectorate += emp.salary;
                });

                return {
                    directorate: dir.dirName,
                    employeeCountPerDirectorate,
                    totalSalaryPerDirectorate,
                };
            })
        );

        res.status(200).json({
            allDirectorates,
            page,
            limit,
            skip,
            totalDirectorates,
            empPerDirectorate,
            totalPages,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDirectorate = async (req, res) => {
    try {
        const { dirCode, dirName } = req.body;
        const id = req.params.id;

        if (dirCode && dirName) {
            const isDirectorateExisted = await Directorate.findOne({
                $or: [{ dirCode: dirCode }, { dirName: dirName }],
            });

            if (isDirectorateExisted)
                return res.status(400).json({
                    message: `Directorate with code ${dirCode} and name ${dirName} already existed!`,
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

        const deletedDirectorate = await Directorate.findByIdAndDelete(id);

        if (!deletedDirectorate)
            return res.status(400).json({
                message: `Directorate with ID (${id}) did not existed!`,
            });

        res.status(200).json({
            message: `Directorate with ID (${id}) successfully deleted!`,
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
