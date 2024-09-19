const express = require("express");
const router = express.Router();
const User = require("../models/userModel")


router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ user: error.user });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ user: error.user });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ user: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ user: error.user });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true, 
        });
        if (!user) {
            return res.status(404).json({ user: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ user: error.user });
    }
});

router.delete('/:id', async (req, res) => {
    //להוסיף רק שאותו משתמש יוכל יוכל למחוק את עצמו.
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ user: 'user not found' });
        }
        res.status(200).json({ user: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ user: error.user });
    }
});

module.exports = router;