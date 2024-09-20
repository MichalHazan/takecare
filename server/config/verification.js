const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");  // Import bcrypt for password comparison
const User = require("../models/userModel");

const secretKey = 'your_secret_key';  // Secret key for JWT

// Route for user login and token generation
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });  // If the user is not found, return an error
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);  // bcrypt compares the raw password with the hashed password
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });  // If the password is incorrect, return an error
        }

        // Generate JWT token with _id and role
        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

        // Return the token to the client
        res.json({ token });  // Send the token to the client upon successful login
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });  // Handle any server errors
    }
});

// Route to handle GET requests to show it's not supported for login
router.get('/', async (req, res) => {
    return res.status(401).json({ message: 'You sent a GET request, send the verification request in POST' });  // Inform the client that login should be done via POST
});

module.exports = router;
