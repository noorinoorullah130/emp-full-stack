const express = require("express");
const router = express.Router();

const {
    addNewEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    getAllDepartmentsForNewEmployee,
} = require("../controllers/employee");

const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, addNewEmployee);
router.get("/", verifyToken, getAllEmployees);
router.get(
    "/departmentsfornewemployee",
    verifyToken,
    getAllDepartmentsForNewEmployee
);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

module.exports = router;
