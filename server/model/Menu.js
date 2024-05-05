const mongoose = require('mongoose');

// Skema user
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    images: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


module.exports = menuSchema;
