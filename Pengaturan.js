const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/ramen");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginprototype = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});


const dbset = new mongoose.model("users", Loginprototype);

module.exports = dbset;