const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const session = require("express-session");
const routes = require("./routes/index")
const adminRoute = require("./routes/admin")



const mongoose = require('mongoose');
const { User, Menu, Transaction } = require("./server/model/Index");
const flash = require("express-flash");

// Menghubungkan ke database MongoDB
mongoose.connect("mongodb://localhost:27017/ramen")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.log("Database cannot be Connected", error);
    });


// Inisialisasi session middleware
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());



app.use("/", routes)
app.use("/admin", adminRoute)

//static
app.use(express.static("public"));


app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
