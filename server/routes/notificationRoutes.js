const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({});
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/notifications', async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true, 
        });
        if (!notification) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/notifications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Notification.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
