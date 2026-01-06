const express = require("express");
const router = express.Router();

const getDashboardInformation = require("../controllers/dashboard");
const verifyToken = require("../middleware/verifyToken");

router.get("/", getDashboardInformation);

module.exports = router;
