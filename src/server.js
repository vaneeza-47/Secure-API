require('dotenv').config();
const express = require('express');
const supabase = require('./config/supabaseClient');

const app = express();
app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running and connected to Supabase");
});


