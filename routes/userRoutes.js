// /routes/userRoutes.js
const express = require("express");
const { getUsers, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/usuarios", getUsers);
router.delete("/usuarios/:id", deleteUser);

module.exports = router;
