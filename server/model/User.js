const mongoose = require('mongoose');

// Skema user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Role yang diizinkan
        default: 'user' // Nilai default
    }
});



module.exports = userSchema;
