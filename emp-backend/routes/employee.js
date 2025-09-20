const express = require("express");
const router = express.Router();

const {
    addNewEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
} = require("../controllers/employee");

const verifyToken = require("../middleware/verifyToken");

router.post("/", addNewEmployee);
router.get("/", getAllEmployees);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

module.exports = router;
