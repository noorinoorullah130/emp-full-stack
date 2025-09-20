const express = require("express");
const router = express.Router();

const updateUserPasswordByUser = require("../controllers/setting");
const verifyToken = require("../middleware/verifyToken");

router.put("/:id", verifyToken, updateUserPasswordByUser);

module.exports = router;
