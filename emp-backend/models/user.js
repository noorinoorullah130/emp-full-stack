const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minLength: 3 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minLength: 8 },
        role: { type: [String], enum: ["user", "admin"], default: "user" },
        directorate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Directorate",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
