const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const checkRole = require("../middleware/checkRole");

const {
    addNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getAllDirectoratesForNewUser,
} = require("../controllers/user");

router.post("/", verifyToken, checkRole, addNewUser);
router.get("/", verifyToken, checkRole, getAllUsers);
router.get(
    "/directoratesfornewuser",
    verifyToken,
    checkRole,
    getAllDirectoratesForNewUser
);
router.put("/:id", verifyToken, checkRole, updateUser);
router.delete("/:id", verifyToken, checkRole, deleteUser);

module.exports = router;
