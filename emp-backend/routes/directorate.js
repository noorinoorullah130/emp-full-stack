const express = require("express");
const router = express.Router();

const {
    addNewDirectorate,
    getAllDirectorates,
    updateDirectorate,
    deleteDirectorate,
} = require("../controllers/directorate");
const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkRole");

router.post("/", verifyToken, checkRole, addNewDirectorate);
router.get("/", verifyToken, checkRole, getAllDirectorates);
router.put("/:id", verifyToken, checkRole, updateDirectorate);
router.delete("/:id", verifyToken, checkRole, deleteDirectorate);

module.exports = router;
