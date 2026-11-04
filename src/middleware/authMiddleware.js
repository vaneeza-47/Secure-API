/**@type {import('@supabase/supabase-js').SupabaseClient} */
const supabase = require('../config/supabaseClient.js');

async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    //verify authHeader
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

    // extract and verify token 
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    // get user details
    const {data, error} = await supabase.auth.getUser(token);
    if (error) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }

    req.user = data.user;
    next();
    
}

module.exports = verifyToken;