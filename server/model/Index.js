const mongoose = require('mongoose');
const userSchema = require('./User');
const menuSchema = require('./Menu');
const transactionSchema = require('./Transaction');

// Buat model dari skema
const User = mongoose.model('User', userSchema);
const Menu = mongoose.model('Menu', menuSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    User, Menu, Transaction
}