const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
    try {
        // Clear existing specific users to ensure fresh start
        await User.deleteMany({
            $or: [
                { email: 'geraldquinto1011@gmail.com' },
                { username: 'gerald' },
                { email: 'user@example.com' },
                { username: 'user123' },
                { email: 'admin@gatcha.com' } // Old admin email
            ]
        });

        const admin = await User.create({
            name: 'Gerald Quinto',
            username: 'gerald',
            email: 'geraldquinto1011@gmail.com',
            password: 'admin123',
            role: 'admin'
        });

        const user = await User.create({
            name: 'Regular User',
            username: 'user123',
            email: 'user@example.com',
            password: 'user123',
            role: 'user'
        });

        console.log('Accounts created successfully!');
        console.log('Admin -> Username: gerald, Password: admin123');
        console.log('User  -> Username: user123, Password: user123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
