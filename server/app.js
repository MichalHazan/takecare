const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require("./routes/userRoutes");
const Message = require("./routes/messageRoutes");
const Notification = require("./routes/notificationRoutes");
const Service = require("./routes/serviceRoutes");
const Review = require("./routes/reviewsRoutes");

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@youtube-articles-api-vkfyt.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected!');
});


app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use("/user", User);
app.use("/message", Message);
app.use("/notification", Notification);
app.use("/service", Service);
app.use("/review", Review);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;