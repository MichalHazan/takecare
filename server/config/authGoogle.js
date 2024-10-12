const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/userModel");

// Secret key for creating the new JWT
const secretKey = 'MY_SECRET_KEY'; // Replace with a real secret key

// Route that receives the token from Google and returns a new token
router.post('/', async (req, res) => {
    const { tokenGoogle } = req.body;
    console.log('Request body:', req.body);
    console.log('tokenGoogle  :  '+tokenGoogle);
    //const { token: googleToken } = req.body; // Extract the JWT sent from the client

    if (!tokenGoogle) {
        return res.status(400).json({ error: 'No token provided' }); // Return error if no token is provided
    }
    console.log('Token creation succeeded!!!')

    try {
        // Decode the token without verifying (no signature or Google API check)
        const decoded = jwt.decode(tokenGoogle); // Decode the JWT

        if (!decoded) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        // Extract the email from the decoded token
        const email = decoded.email;
console.log('email  '+email)
        // Find the user in the database using the email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });  // Return error if user is not found
        }

        // Create a new token with the user's _id and role
        const newToken = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

        // Return the new token to the client
        res.json({ token: newToken });  // Send the token to the client upon successful login

    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(500).json({ error: 'Failed to decode token' });
    }
});

module.exports = router;
