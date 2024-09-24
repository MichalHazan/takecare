const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const checkIdMatch = require('../middleware/IsOwner');  // Importing the middleware to check if the user is authorized

// Route to get all users (no specific ID required)
//router.get('/', async (req, res) => {
//  try {
//    const users = await User.find({});
//  console.log(users);
//  res.status(200).json(users);  // Returning all users
// } catch (error) {
//      res.status(500).json({ user: error.user });
//  }
//});

// Route to get all users (same as above, but redundant)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.status(200).json(users);  // Returning all users
    } catch (error) {
        res.status(500).json({ user: error.user });
    }
});

// Route to get a specific user by ID with the IsOwner middleware
router.get('/:id', checkIdMatch, async (req, res) => {  // Adding the middleware here
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ user: 'user not found' });  // If user not found
        }

        // Logging the user role
        //Here it should be done in a separate middleware for 'role' verification
        if (user.role === 'professional') {
            console.log('professional');
        } else if (user.role === 'client') {
            console.log('client privileges only');
        }

        res.status(200).json(user);  // Returning the user if found
    } catch (error) {
        res.status(500).json({ user: error.user });
    }
});

// Route to update user data, also using the middleware for ownership check
router.put('/:id', checkIdMatch, async (req, res) => {  // Adding the middleware here
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ user: 'user not found' });  // If user not found
        }

        res.status(200).json(user);  // Returning the updated user
    } catch (error) {
        res.status(400).json({ user: error.user });
    }
});

// Route to delete a user, also using the middleware for ownership check
router.delete('/:id', checkIdMatch, async (req, res) => {  // Adding the middleware here
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ user: 'user not found' });  // If user not found
        }

        await User.findByIdAndDelete(id);  // Deleting the user

        res.status(200).json({ message: 'User deleted successfully' });  // Returning success message
    } catch (error) {
        res.status(500).json({ user: error.user });
    }
});

module.exports = router;
