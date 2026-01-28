const User = require('../models/User');

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
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
