// models/transactionModel.js

const mongoose = require('mongoose');

// Skema Transactions
const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu', // Mengacu pada model Menu
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        sub_total: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    noMeja: {
        type: Number,
        required: true
    },
    catatan: {
        type: String
    },
    address: {
        type: String
    }
});

module.exports = transactionSchema;
