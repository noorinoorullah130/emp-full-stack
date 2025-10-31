const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const {
    addNewDpt,
    getAllDpts,
    updateDpt,
    deleteDpt,
} = require("../controllers/department");

router.post("/", verifyToken, addNewDpt);
router.get("/", verifyToken, getAllDpts);
router.put("/:id", verifyToken, updateDpt);
router.delete("/:id", verifyToken, deleteDpt);

module.exports = router;
