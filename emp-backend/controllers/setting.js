const User = require("../models/user");
const bcrypt = require("bcrypt");

const updateUserPasswordByUser = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user._id;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Old and new passwords are required!" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .json({ message: `User with id (${userId}) does not exist!` });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is wrong!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "User password updated successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = updateUserPasswordByUser;
