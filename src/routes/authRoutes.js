const express = require('express');
const router = express.Router();
/** @type {import('@supabase/supabase-js').SupabaseClient} */
const supabase = require('../config/supabaseClient');

//signup handler
router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    const {data, error} = await supabase.auth.signUp({ email, password });
    if(error) return res.status(400).json({ error: error.message });

    return res.status(201).json({
        user: data.user
    })
});

// login handler
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    const {data, error} = await supabase.auth.signInWithPassword({email, password});
    if (error) return res.status(401).json({
        error: "Invalid login credentials"
    });

    return res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
    });
    
});

module.exports = router;