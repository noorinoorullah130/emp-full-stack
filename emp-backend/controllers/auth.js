const User = require("../models/user");
const Directorate = require("../models/directorate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
        return res.status(400).json({ message: "Invalid credentials!" });

    const payload = {
        _id: user._id,
        email: user.email,
        directorate: user.directorate,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    const directorate = await Directorate.findById(user.directorate).select(
        "dirName"
    );

    res.status(200).json({
        token,
        username: user.name,
        directorate: directorate,
        role: user.role,
    });
};

module.exports = login;
