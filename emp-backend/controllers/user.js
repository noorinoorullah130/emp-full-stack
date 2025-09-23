const User = require("../models/user");
const Directorate = require("../models/directorate");
const bcrypt = require("bcrypt");

const addNewUser = async (req, res) => {
    try {
        const { name, email, password, role, directorate } = req.body;

        const isEmailDuplicate = await User.findOne({ email: email });

        if (isEmailDuplicate)
            return res.status(400).json({
                message: "User already existed!",
            });

        const hashPassword = await bcrypt.hash(password, 10);

        const directorateId = await Directorate.findOne({
            dirName: directorate,
        }).select("_id");

        if (!directorateId)
            return res
                .status(404)
                .json({ message: `Directorate ID was not found!` });

        const userData = {
            name,
            email,
            password: hashPassword,
            role,
            directorate: directorateId,
        };

        const newUser = new User(userData);

        await newUser.save();

        res.status(201).json({
            message: "New User Created!",
            newUser,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const allUsers = await User.find()
            .select("-password")
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip);

        const allDirectorates = await Directorate.find()
            .sort({ _id: -1 })
            .limit(limit)
            .skip(skip)
            .select("dirName");

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            allUsers,
            allDirectorates,
            page,
            limit,
            skip,
            totalUsers,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const getAllDirectoratesForNewUser = async (req, res) => {
    try {
        const allDirectorates = await Directorate.find().select("dirName");
        res.status(200).json(allDirectorates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, directorate, role } = req.body;
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            return res
                .status(404)
                .json({ message: `User with id(${id}) not found!` });
        }

        if (email) {
            const emailExists = await User.findOne({ email, _id: { $ne: id } });

            if (emailExists) {
                return res
                    .status(400)
                    .json({ message: "Email already in use!" });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { name, email, directorate, role } },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: `User with id(${id}) successfully edited!`,
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message,
        });
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res
                .status(404)
                .json({ message: `User with id(${id}) not found!` });
        }

        res.status(200).json({
            message: `User with id(${id}) successfully deleted!`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message,
        });
        console.log(error);
    }
};

module.exports = {
    addNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getAllDirectoratesForNewUser,
};
