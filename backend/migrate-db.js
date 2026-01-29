const mongoose = require('mongoose');
const User = require('./src/models/User'); // Adjust path as needed
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// CONFIGURATION
const LOCAL_URI = 'mongodb://localhost:27017/gatching';

// --- IMPORTANT ---
// Replace this with your actual VPS connection string.
// If your VPS Mongo is blocked from outside (default), you must use SSH Tunneling 
// OR use the mongodump/restore method instead.
// Example: mongodb://username:password@84.32.84.32:27017/gatching
const REMOTE_URI = process.env.REMOTE_MONGO_URI || 'mongodb://84.32.84.32:27017/gatching';

const migrate = async () => {
    try {
        // 1. FETCH FROM LOCAL
        console.log('🔌 Connecting to LOCAL DB...');
        await mongoose.connect(LOCAL_URI);
        console.log('✅ Connected to Local.');

        const localUsers = await User.find({});
        console.log(`📦 Found ${localUsers.length} users in local database.`);

        await mongoose.disconnect();
        console.log('🔌 Disconnected from Local.\n');

        if (localUsers.length === 0) {
            console.log('⚠️ No users to migrate.');
            return;
        }

        // 2. SAVE TO REMOTE
        console.log('🔌 Connecting to REMOTE VPS DB...');
        // Note: This connection will FAIL if VPS firewall blocks Port 27017 (which is good security practice)
        // You might need to tunnel: ssh -L 27017:localhost:27017 root@84.32.84.32
        await mongoose.connect(REMOTE_URI);
        console.log('✅ Connected to Remote.');

        let successCount = 0;
        let skipCount = 0;

        for (const user of localUsers) {
            const exists = await User.findOne({ email: user.email });
            if (exists) {
                console.log(`Skipping existing user: ${user.email}`);
                skipCount++;
            } else {
                // Remove _id to let Remote DB generate its own (avoid conflicts) or keep it if strictly syncing
                const userData = user.toObject();
                delete userData._id;

                await new User(userData).save();
                console.log(`✅ Migrated: ${user.email} (${user.role})`);
                successCount++;
            }
        }

        console.log('\n=============================');
        console.log(`🎉 Migration Complete!`);
        console.log(`✅ Added: ${successCount}`);
        console.log(`⏭️ Skipped: ${skipCount}`);
        console.log('=============================');

        await mongoose.disconnect();

    } catch (err) {
        console.error('❌ Migration Error:', err);
    }
};

migrate();
