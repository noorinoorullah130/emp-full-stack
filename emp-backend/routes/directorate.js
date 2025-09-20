const express = require("express");
const router = express.Router();

const {
    addNewDirectorate,
    getAllDirectorates,
    updateDirectorate,
    deleteDirectorate,
} = require("../controllers/directorate");

router.post("/", addNewDirectorate);
router.get("/", getAllDirectorates);
router.put("/:id", updateDirectorate);
router.delete("/:id", deleteDirectorate);

module.exports = router;
