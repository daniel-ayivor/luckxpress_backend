// Main server file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoute = require('./servers/route/UserRoute');
const trackRoute = require('./servers/route/TrackingRoute');
config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Updated CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
const allowedOrigins = [
  "https://lxpresscargo.com",                // <-- Your frontend domain (production)
  "https://luckxpress-backend.onrender.com", // <-- Backend domain (sometimes useful, e.g. SSR or internal)
  "https://luckyexpress-dashboard.vercel.app",
  "https://friendly-courier-hub-ec1o.vercel.app",
  "https://luckyxpress-cargo-oojw.vercel.app",
  "http://localhost:3000"                     // For local dev
];
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type", 
      "Authorization",
      "X-Requested-With",
      "Accept"
    ],
    exposedHeaders: [
      "Content-Length",
      "Authorization",
      "Set-Cookie"
    ],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  
  app.use(cors(corsOptions));
  
  // Handle preflight requests
  app.options('*', cors(corsOptions));
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


const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://luckyxpress:luckyxpress%4023@cluster0.zh7sm1a.mongodb.net/luckyexpress?retryWrites=true&w=majority&appName=Cluster0');
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