const express = require("express");
const router = express.Router();
const User = require("../models/userModel")


router.post('/', async (req, res) => {
    try {

       
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

// A new user is registered here.
// in a separate file, because it needs [token] authentication before it is registered.

// Also for encrypting the password before saving it in MongoDB
// The encryption has not yet been performed [and should be set in authentication against an encrypted password]