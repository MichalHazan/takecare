const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require("./routes/userRoutes");
const auth = require("./routes/verification");
const Message = require("./routes/messageRoutes");
const Notification = require("./routes/notificationRoutes");
const Service = require("./routes/serviceRoutes");
const Review = require("./routes/reviewsRoutes");
require("dotenv").config("./.env");

// Log for starting the connection to MongoDB
console.log("Attempting to connect to MongoDB...");

// Connect to MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/takecare16`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Log when MongoDB is connected successfully
mongoose.connection.on('connected', () => {
    console.log('MongoDB     Connected!');
});
console.log("morgan");

// Log if there's an error in connecting to MongoDB
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use(morgan("dev"));


// Log for middleware setup
console.log("Setting up middleware...");

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Log for CORS configuration
console.log("Setting up CORS headers...");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Log for setting up routes
console.log("Setting up routes...");
app.use("/auth", auth);
app.use("/user", User);
app.use("/message", Message);
app.use("/notification", Notification);
app.use("/service", Service);
app.use("/review", Review);

// Log for when a route is not found (404)
app.use((req, res, next) => {
    console.log("404 - Route not found:", req.originalUrl);
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Log for handling errors
app.use((error, req, res, next) => {
    console.error(`Error occurred: ${error.message}`);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Log when exporting the app module
console.log("Exporting the app module...");
module.exports = app;
