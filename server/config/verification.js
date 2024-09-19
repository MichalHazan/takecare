const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const secretKey = 'your_secret_key';  // Secret key for JWT

// Route for user login and token generation
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare the provided password directly with the stored password
        if (password !== user.password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token with _id and role
        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

        // Return the token to the client
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
