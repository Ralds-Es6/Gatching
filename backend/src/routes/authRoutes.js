const express = require('express');
const router = express.Router();
const { login, register, verifyOTP } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/verify-otp', verifyOTP);

module.exports = router;
