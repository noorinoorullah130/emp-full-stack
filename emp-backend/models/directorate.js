const mongoose = require("mongoose");

const directoratesSchema = new mongoose.Schema(
    {
        dirCode: {
            type: Number,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        dirName: {
            type: String,
            unique: true,
            required: true,
            minLength: 5,
            trim: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

const Directorate = mongoose.model("Directorate", directoratesSchema);

module.exports = Directorate;
