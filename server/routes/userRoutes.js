const express = require("express");
const router = express.Router();
const User = require("../models/userModel")




router.get('/', async (req, res) => {

    try {
        const users = await User.find({});
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ user: error.user });
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
        console.log(id);
        const user = await User.findById(id);
        console.log(user)

        if (!user) {
            return res.status(404).json({ user: 'user not found' });
        }
        if(user.role ==='professional'){
            console.log('professional')
        }else if(user.role === 'client'){
            console.log('client privileges only')
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
    const { id } = req.params;
    const user = await User.findById(id);
    const resultD = await User.findByIdAndDelete(id);
    try {
        if (!user) {
            return res.status(404).json({ user: 'user not found' });
        }
        else  if(user._id !== req.params) {
            return res.status(404).json('The user is not authorized to perform actions on another user');
        }

        res.status(200).json({ user: 'user deleted successfully' });
    } catch (error) {
        res.status(500).json({ user: error.user });
    }
});

module.exports = router;