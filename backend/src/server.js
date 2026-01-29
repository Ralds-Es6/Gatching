const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const allowedOrigins = [
    'https://astralworldhph.cloud',
    'http://astralworldhph.cloud',
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Route files
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const gachaRoutes = require('./routes/gachaRoutes');

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gacha', gachaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
