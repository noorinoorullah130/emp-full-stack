const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkRole");

const {
    addNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../controllers/user");

router.post("/", addNewUser);
router.get("/", getAllUsers);
router.put("/:id", verifyToken, checkRole, updateUser);
router.delete("/:id", verifyToken, checkRole, deleteUser);

module.exports = router;
