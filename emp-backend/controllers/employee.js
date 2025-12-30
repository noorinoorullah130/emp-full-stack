const Department = require("../models/department");
const Employee = require("../models/employee");
const calculateSalary = require("../utils/calculateSalary");

const addNewEmployee = async (req, res) => {
    try {
        const { name, fName, grade, step, experience, department, idNumber } =
            req.body;

        const directorateOfNewEmployee = req.user.directorate;

        console.log(req.user);
        console.log(directorateOfNewEmployee);

        if (
            !name ||
            !fName ||
            !grade ||
            !step ||
            !experience ||
            !department ||
            !idNumber
        ) {
            return res
                .status(400)
                .json({ message: "Required fields are missing!" });
        }

        const isEmployeeExist = await Employee.findOne({ idNumber: idNumber });

        if (isEmployeeExist)
            return res.status(400).json({
                message: `Employee with ID Number (${idNumber}) already existed!`,
            });

        const newEmployee = new Employee({
            name,
            fName,
            grade,
            step,
            salary: calculateSalary(grade, step),
            experience,
            department,
            idNumber,
            directorate: directorateOfNewEmployee,
        });

        await newEmployee.save();

        res.status(201).json({ message: "New Employee added!", newEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const allEmployees = await Employee.find()
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip);

        const totalEmployees = await Employee.countDocuments();

        res.status(200).json({
            page,
            limit,
            skip,
            allEmployees,
            totalEmployees,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDepartmentsForNewEmployee = async (req, res) => {
    try {
        const directorateId = parseInt(req.query.directorateId);

        const idOfDirectorateToFetchDepts = req.user.role.includes("admin")
            ? directorateId
            : req.user.directorate;

        const deptOfDirectorate = await Department.find({
            directorate: idOfDirectorateToFetchDepts,
        }).sort({ _id: -1 });

        res.status(200).json({ deptOfDirectorate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { name, fName, grade, step, experience, department, idNumber } =
            req.body;

        const id = req.params.id;

        const employee = await Employee.findById(id);

        if (!employee)
            return res
                .status(404)
                .json({ message: `Employee with id (${id}) not found!` });

        if (idNumber) {
            const isIdNumberExist = await Employee.findOne({
                idNumber: idNumber,
                _id: { $ne: id },
            });

            if (isIdNumberExist) {
                return res.status(400).json({
                    message: `Employee with ID Number (${idNumber}) already exists!`,
                });
            }
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    fName,
                    grade,
                    step,
                    experience,
                    department,
                    idNumber,
                },
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: `Employee with id (${id}) successfully updated!`,
            updatedEmployee,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteEmployee = await Employee.findByIdAndDelete(id);

        if (!deleteEmployee)
            return res
                .status(400)
                .json({ message: `Employee with id (${id}) is not existed!` });

        res.status(200).json({
            message: `Employee with id (${id}) id deleted successfully!`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addNewEmployee,
    getAllEmployees,
    getAllDepartmentsForNewEmployee,
    updateEmployee,
    deleteEmployee,
};
