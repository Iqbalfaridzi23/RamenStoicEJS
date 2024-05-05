// routes/mainRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('../server/user/userController');
const MenuController = require('../server/menu/menuController');
const multer = require('multer');
const DashboardController = require('../server/dashboardController');
const { route } = require('.');
const Midleware = require('../server/middlewares/middleware');
const TransactionController = require('../server/transactions/TransactionController');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/img/menu') // Simpan gambar di folder "uploads"
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Atur nama file dengan timestamp dan nama asli file
    }
});

const upload = multer({ storage: storage });

router.post("/login", UserController.loginAdmin);
router.get("/login", (req, res) => {
    res.render('admin/login', { error: req.flash('error') });
})

router.use(Midleware.isAdmin)
// Penanganan rute untuk "/"
router.get("/dashboard", DashboardController.dashboard)

router.get("/users", UserController.aUsers);
router.post("/users", UserController.aAddUser);
router.get("/users/delete/:id", UserController.aDeleteUser);
router.get("/users/edit/:id", UserController.aEditUser);
router.post("/users/update/:id", UserController.aUpdateUser);



router.get("/ramen", MenuController.aRamens);
router.post("/ramen", upload.single("image"), MenuController.aAddRamen);
router.get("/ramen/delete/:id", MenuController.aDeleteRamen);
router.get("/ramen/edit/:id", MenuController.aEditRamen);




router.post("/ramen/update/:id", upload.single("image"), MenuController.aUpdateRamen);



router.get('/transactions', TransactionController.aTranactions)
router.post('/transactions/aprove/:id', TransactionController.approve)
router.post('/transactions/decline/:id', TransactionController.decline)
router.post('/logout', UserController.logoutAdmin)




router.get("/user/create", (req, res) => {
    res.render('admin/user/add');
});



router.get("/ramen/create", (req, res) => {
    res.render('admin/menu/add');
});





module.exports = router;
