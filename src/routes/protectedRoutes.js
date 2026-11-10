const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware.js')

router.get("/profile",verifyToken ,async (req, res) => {
    // return user details
    return res.status(200).json({
        user: {
            id: req.user.id,
            email: req.user.email,
            created_at: req.user.created_at
        }
    });
});

router.get("/dashboard", verifyToken, async (req, res) => {
    return res.status(200).json({
        message: "Welcome to the dashboard!",
        user: req.user
    });
});

module.exports = router;