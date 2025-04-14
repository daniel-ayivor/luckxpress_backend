// Main server file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoute = require('./route/UserRoute');
const trackRoute = require('./route/TrackingRoute');
config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:8080"],  // Adjust based on frontend URL
    credentials: true,  // Ensures cookies are sent
}));

// Routes
app.use('/auth', authRoute);
app.use('/track', trackRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation Error', details: err.errors });
    } 
    if (err.code === 11000) {
        return res.status(400).json({ message: 'Duplicate Key Error', details: err.keyValue });
    }
    
    res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to MongoDB
// In your main server file, update the MongoDB connection:
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

connectDatabase();

// Start the server
const PORT = process.env.PORT || 3000; // Fallback port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});