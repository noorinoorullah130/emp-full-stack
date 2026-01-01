const Department = require("../models/department");
const Directorate = require("../models/directorate");
const Employee = require("../models/employee");
const calculateSalary = require("../utils/calculateSalary");

const addNewEmployee = async (req, res) => {
    try {
        const {
            name,
            fName,
            grade,
            step,
            experience,
            idNumber,
            directorate,
            department,
            hireDate,
        } = req.body;

        if (
            !name ||
            !fName ||
            !grade ||
            !step ||
            !experience ||
            !idNumber ||
            !directorate ||
            !department ||
            !hireDate
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
            idNumber,
            directorate,
            department,
            hireDate,
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

        const allEmployees = req.user.role.includes("admin")
            ? await Employee.find().sort({ _id: -1 }).limit(limit).skip(skip)
            : await Employee.find({ directorate: req.user.directorate })
                  .sort({ _id: -1 })
                  .limit(limit)
                  .skip(skip);

        const allDirecorates = await Directorate.find();
        const allDepartments = await Department.find();

        // Combine Directorate & Department names with each Employee instead of their IDs
        const employeesWithDirectorateName = allEmployees.map((emp) => {
            const dir = allDirecorates.find((d) =>
                d._id.equals(emp.directorate)
            );

            const dpt = allDepartments.find((d) =>
                d._id.equals(emp.department)
            );

            return {
                ...emp.toObject(),
                directorate: dir.dirName,
                department: dpt.dptName,
            };
        });

        const totalEmployees = req.user.role.includes("admin")
            ? await Employee.countDocuments()
            : await Employee.countDocuments({
                  directorate: req.user.directorate,
              });

        res.status(200).json({
            page,
            limit,
            skip,
            allEmployees: employeesWithDirectorateName,
            totalEmployees,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDepartmentsForNewEmployee = async (req, res) => {
    try {
        const directorateId = req.query.directorateId;

        const deptOfDirectorate = await Department.find({
            directorate: directorateId,
        }).select("dptName");

        res.status(200).json(deptOfDirectorate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const {
            name,
            fName,
            grade,
            step,
            experience,
            directorate,
            department,
            idNumber,
            hireDate,
        } = req.body;

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
                    salary: calculateSalary(grade, step),
                    experience,
                    directorate,
                    department,
                    idNumber,
                    hireDate,
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
