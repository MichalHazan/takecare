const express = require('express');
const passport = require('passport');
const router = express.Router();

// נתיב להתחברות עם Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// נתיב להחזרת המשתמש לאחר ההתחברות עם Google
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // אם ההתחברות הצליחה, הפנה לעמוד מוגן
        res.redirect('/protected');
    }
);

module.exports = router;
