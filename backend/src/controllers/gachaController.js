const User = require('../models/User');

const hannyangiPool = [
    'hc1.png', 'hc2.png', 'hc3.png',
    'he1.png', 'he2.png', 'he3.png',
    'hh1.png', 'hh2.png', 'hh3.png',
    'ho1.png', 'ho2.png', 'ho3.png',
    'hs1.png', 'hs2.png', 'hs3.png'
];

const jaeguriPool = [
    'jc1.png', 'jc2.png', 'jc3.png',
    'je1.png', 'je2.png', 'je3.png',
    'jh1.png', 'jh2.png', 'jh3.png',
    'jo1.png', 'jo2.png', 'jo3.png',
    'js1.png', 'js2.png', 'js3.png'
];

exports.wishHannyangi = async (req, res) => {
    const { email, username } = req.body;
    console.log('Wish request received for:', email || username);

    try {
        const user = await User.findOne({
            $or: [
                { email: email || '___never_match___' },
                { username: username || '___never_match___' }
            ]
        });
        console.log('User found:', user ? (user.email || user.username) : 'not found');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user already has a Hannyangi card
        const alreadyWished = user.inventory.some(item => item.pool === 'hannyangi');
        if (alreadyWished) {
            return res.status(400).json({
                success: false,
                message: 'You have already used your one-time wish for Hannyangi.'
            });
        }

        const randomIndex = Math.floor(Math.random() * hannyangiPool.length);
        const selectedImage = hannyangiPool[randomIndex];

        // Use findOneAndUpdate to avoid validation issues with missing/unselected fields like password
        await User.findOneAndUpdate(
            { _id: user._id },
            {
                $push: {
                    inventory: {
                        imageName: selectedImage,
                        pool: 'hannyangi'
                    }
                }
            }
        );

        res.status(200).json({
            success: true,
            data: selectedImage
        });
    } catch (err) {
        console.error('GACHA WISH ERROR:', err);
        res.status(500).json({
            success: false,
            message: `Server error: ${err.message}`
        });
    }
};

exports.wishJaeguri = async (req, res) => {
    const { email, username } = req.body;
    console.log('Jaeguri Wish request received for:', email || username);

    try {
        const user = await User.findOne({
            $or: [
                { email: email || '___never_match___' },
                { username: username || '___never_match___' }
            ]
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user already has a Jaeguri card
        const alreadyWished = user.inventory.some(item => item.pool === 'jaeguri');
        if (alreadyWished) {
            return res.status(400).json({
                success: false,
                message: 'You have already used your one-time wish for Jaeguri.'
            });
        }

        const randomIndex = Math.floor(Math.random() * jaeguriPool.length);
        const selectedImage = jaeguriPool[randomIndex];

        await User.findOneAndUpdate(
            { _id: user._id },
            {
                $push: {
                    inventory: {
                        imageName: selectedImage,
                        pool: 'jaeguri'
                    }
                }
            }
        );

        res.status(200).json({
            success: true,
            data: selectedImage
        });
    } catch (err) {
        console.error('JAEGURI WISH ERROR:', err);
        res.status(500).json({
            success: false,
            message: `Server error: ${err.message}`
        });
    }
};

exports.getInventory = async (req, res) => {
    const { email, username } = req.query;

    try {
        const user = await User.findOne({
            $or: [
                { email: email || '___never_match___' },
                { username: username || '___never_match___' }
            ]
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            inventory: user.inventory
        });
    } catch (err) {
        console.error('GET INVENTORY ERROR:', err);
        res.status(500).json({
            success: false,
            message: `Server error: ${err.message}`
        });
    }
};
