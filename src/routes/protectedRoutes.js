const express = require('express');
const router = express.Router();
/** @type {import ('@supabase/supabase-js').SupabaseClient} */
const supabase = require('../config/supabaseClient');

router.get("/profile", async (req, res) => {
    const authHeader = req.headers['authorization'];

    // verify authHeader
    if (!authHeader) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    //extract token
    const token = authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

     // verify token
    const {data, error} = await supabase.auth.getUser(token);
    if (error) return res.status(401).json({
        error: "Invalid or expired token"
    });

    // return user details
    return res.status(200).json({
        user: data.user
    });
});

module.exports = router;