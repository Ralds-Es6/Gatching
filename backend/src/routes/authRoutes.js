const express = require('express');
const router = express.Router();
const { login, register, verifyOTP, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
