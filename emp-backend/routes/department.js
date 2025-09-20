const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
    addNewDpt,
    getAllDpts,
    updateDpt,
    deleteDpt,
} = require("../controllers/department");
const router = express.Router();

router.post("/", verifyToken, addNewDpt);
router.get("/", getAllDpts);
router.put("/:id", verifyToken, updateDpt);
router.delete("/:id", verifyToken, deleteDpt);

module.exports = router;
