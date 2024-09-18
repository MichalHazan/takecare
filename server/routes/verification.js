// routes/verification.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  // Make sure you import your User model correctly

// Middleware to handle JSON request bodies
router.use(express.json());

// Function to generate a JWT token
function generateToken(user) {
    const payload = {
        id: user.id,
        role: user.role  
    };
    // Generate the token with a 1-hour expiration time
    return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
}

// Async function to find a user by email
const findByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return { user, found: !!user };
    } catch (error) {
        console.error('Error finding user by email:', error);
        return { user: null, found: false };
    }
};

// POST route for user login and token generation
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const result = await findByEmail(email);

    // Check if user was found
    if (!result.found) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Check if password is correct
    if (password !== result.user.password) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate token if password is correct
    const token = generateToken({ id: result.user._id, role: result.user.role });
    return res.json({ token });
});

module.exports = router;
