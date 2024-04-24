const express = require("express");
const app = express();
const port = 3000;
const path = require ("path");
const dbset = require ("./Pengaturan");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signUp", (req, res) => {
    res.render("signup");
});

app.get("/Kontak", (req, res) => {
    res.render("Kontak");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/Menu", (req, res) => {
    res.render("Menu");
});

app.get("/About", (req, res) => {
    res.render("About");
});

//static
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

app.post("/login", async (req, res) => {

    const data = {
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
    }

    // Check if the username already exists in the database
    const  userExist = await dbset.findOne({ email: data.email });

    if (data.email && data.password) {
        // Redirect to the Menu page after successful login
        res.redirect("/Menu");
    } else {
        // Jika ada kesalahan dalam proses login, Anda dapat mengirimkan pengguna kembali ke halaman login atau menampilkan pesan kesalahan.
        res.send('Invalid email or password');
    }

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
