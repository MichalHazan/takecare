const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const auth = require("./config/verification");
const User = require("./routes/userRoutes");
const Message = require("./routes/messageRoutes");
const Notification = require("./routes/notificationRoutes");
const Service = require("./routes/serviceRoutes");
const Review = require("./routes/reviewsRoutes");
const registration = require("./routes/newUserRegistration");
const verifyToken = require('./middleware/verifyToken'); // Middleware for token verification
require("dotenv").config("./.env"); // Load environment variables

// Log for starting the connection to MongoDB
console.log("Attempting to connect to MongoDB...");

// Connect to MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/takecare16`, {
    useNewUrlParser: true,  // Use the new URL parser
    useUnifiedTopology: true  // Use the new topology engine
});

// Log when MongoDB is connected successfully
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected!');
});

// Log if there's an error in connecting to MongoDB
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use(morgan("dev")); // Use morgan for logging HTTP requests

// Log for middleware setup
console.log("Setting up middleware...");

app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({
    extended: false // Do not use the extended version of URL encoding
}));

// Log for CORS configuration
console.log("Setting up CORS headers...");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") { // Handle preflight requests
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next(); // Pass control to the next middleware
});

// Log for setting up routes
console.log("Setting up routes...");

app.use("/registration"  ,registration)

// Authentication route (no token verification needed here)
app.use("/auth", auth);

// Middleware for token verification - applied to all routes below
app.use(verifyToken);  // All routes defined after this will require token verification

// Routes that are protected by verifyToken
app.use("/user", User); // User routes
app.use("/message", Message); // Message routes
app.use("/notification", Notification); // Notification routes
app.use("/service", Service); // Service routes
app.use("/review", Review); // Review routes

// Log for when a route is not found (404)
app.use((req, res, next) => {
    console.log("404 - Route not found:", req.originalUrl);
    const error = new Error('Not Found');
    error.status = 404;
    next(error); // Pass error to the next middleware
});

// Log for handling errors
app.use((error, req, res, next) => {
    console.error(`Error occurred: ${error.message}`); // Log the error
    res.status(error.status || 500); // Set response status to the error status or 500
    res.json({
        error: {
            message: error.message // Send the error message in the response
        }
    });
});

// Log when exporting the app module
console.log("Exporting the app module...");
module.exports = app; // Export the Express app
