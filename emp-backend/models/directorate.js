const mongoose = require("mongoose");

const directoratesSchema = new mongoose.Schema(
    {
        dirCode: { type: Number, unique: true, required: true },
        dirName: { type: String, unique: true, required: true, minLength: 5 },
    },
    { timestamps: true }
);

const Directorate = mongoose.model("Directorate", directoratesSchema);

module.exports = Directorate;
