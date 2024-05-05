// routes/mainRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const MenuController = require('../server/menu/menuController');
const Midleware = require('../server/middlewares/middleware');
const UserController = require('../server/user/userController');
const TransactionController = require('../server/transactions/TransactionController');

// Penanganan rute untuk "/"
router.get("/login", (req, res) => {
    res.render("Login", { error: req.flash('error') });
});
router.get("/register", (req, res) => {
    res.render("register", { error: req.flash("error") });
});
router.post("/login", UserController.loginUser);
router.post("/register", UserController.register);






router.get("/Home", (req, res) => {
    res.render("index");
});


router.get("/", (req, res) => {
    res.render("index");
});

// Penanganan rute untuk "/register"

// Penanganan rute untuk "/Kontak"
router.get("/Kontak", (req, res) => {
    res.render("Kontak");
});

// Penanganan rute untuk "/index"
router.get("/index", (req, res) => {
    res.render("index");
});



// 

// Penanganan rute untuk "/About"
router.get("/About", (req, res) => {
    res.render("About");
});


// Penanganan rute untuk "/Menu"
router.get("/Menu", Midleware.isUser, MenuController.index);
// Penanganan rute untuk "/Pemesanan"


router.post('/checkout', Midleware.isUser, TransactionController.checkout)


router.get("/Cart", Midleware.isUser, (req, res) => {
    res.render('Cart', { error: req.flash("error") })
})

router.get("/Pemesanan", Midleware.isUser, TransactionController.getByUserId)
router.get("/Pemesanan/cancel/:id", Midleware.isUser, TransactionController.cancel)


module.exports = router;
