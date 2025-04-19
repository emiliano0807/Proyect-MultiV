// /routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/registrar", registerUser);
router.post("/login", loginUser);

module.exports = router;
