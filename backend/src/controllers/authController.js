const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Register user (Send OTP)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user && user.isVerified) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        if (user) {
            // Update existing unverified user
            user.name = name;
            user.username = username;
            user.password = password;
            user.otp = otp;
            user.otpExpire = otpExpire;
        } else {
            // Create new unverified user
            user = new User({
                name,
                username,
                email,
                password,
                otp,
                otpExpire
            });
        }

        await user.save();

        // Send OTP via email
        try {
            await sendEmail({
                email: user.email,
                subject: 'Account Verification OTP',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #333;">Welcome to Gatching!</h2>
                        <p>Thank you for registering. Please use the following OTP to verify your account:</p>
                        <h1 style="color: #4A90E2; letter-spacing: 5px; text-align: center;">${otp}</h1>
                        <p>This OTP will expire in 10 minutes.</p>
                        <p>If you did not request this, please ignore this email.</p>
                    </div>
                `
            });

            res.status(200).json({ success: true, message: 'OTP sent to email' });
        } catch (err) {
            user.otp = undefined;
            user.otpExpire = undefined;
            await user.save();
            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Verify OTP & Complete Registration
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        console.log(`Attempting verification for: ${email} with OTP: ${otp}`);

        // Find the user first to check OTP and expiry
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: `Invalid OTP. Expected ${user.otp}, got ${otp}` });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        // Use findOneAndUpdate to bypass potential schema validation issues on required fields
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: { isVerified: true },
                $unset: { otp: 1, otpExpire: 1 }
            },
            { new: true }
        );

        console.log(`User ${email} verified successfully via findOneAndUpdate`);

        res.status(200).json({
            success: true,
            message: 'Account verified successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (err) {
        console.error('VERIFICATION ERROR:', err);
        res.status(500).json({
            success: false,
            message: `Server Error: ${err.message}`,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// @desc    Forgot Password (Send OTP)
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        console.log(`Password reset request for: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with that email.' });
        }

        // Generate reset OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        // Update user with OTP using findOneAndUpdate to bypass validation
        await User.findOneAndUpdate(
            { email },
            { $set: { otp, otpExpire } }
        );

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset OTP',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #333;">Password Reset Request</h2>
                        <p>You requested a password reset. Please use the following OTP code:</p>
                        <h1 style="color: #F5A623; letter-spacing: 5px; text-align: center;">${otp}</h1>
                        <p>This OTP will expire in 10 minutes.</p>
                        <p>If you did not request this, please ignore this email.</p>
                    </div>
                `
            });

            console.log(`Reset OTP sent to ${email}`);
            res.status(200).json({ success: true, message: 'Reset OTP sent to email' });
        } catch (err) {
            // Clean up OTP if email fails
            await User.findOneAndUpdate(
                { email },
                { $unset: { otp: 1, otpExpire: 1 } }
            );
            console.error('Email Send Error:', err);
            return res.status(500).json({ success: false, message: 'Email could not be sent. Please check your SMTP settings.' });
        }
    } catch (err) {
        console.error('FORGOT PASSWORD ERROR:', err);
        res.status(500).json({
            success: false,
            message: `Server Error: ${err.message}`
        });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
    const { email, otp, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpire < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        // Set new password
        user.password = password;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email or username
        const user = await User.findOne({
            $or: [
                { email: email },
                { username: email }
            ]
        }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ success: false, message: 'Please verify your email first' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            role: user.role,
            name: user.name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
