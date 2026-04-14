const express = require("express");
const router = express.Router();

const { getCurrentUser } = require("../Controllers/UserController");
const isAuth = require("../middlewares/isAuth");

// ✅ THIS is what your frontend needs
router.get("/current", isAuth, getCurrentUser);

module.exports = router;