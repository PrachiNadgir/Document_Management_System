const express = require('express');
const router = express.Router();

// ✅ correct import
const { SignUp, Login, LogOut,googleAuth } = require('../Controllers/AuthController');

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", LogOut);
router.post("/google", googleAuth);

module.exports = router;