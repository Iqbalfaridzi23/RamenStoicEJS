const { Menu } = require("../model/Index");
const bcrypt = require('bcrypt');



class MenuController {


    // user
    static async index(req, res) {
        const menus = await Menu.find();
        res.render("Menu", { menus });
    }



    // admin
    static async aRamens(req, res) {
        const ramens = await Menu.find();
        // console.log(req.flash('message'));
        res.render('admin/menu/index', { ramens, message: req.flash('message'), error: req.flash("error") });
    }


    static async aAddRamen(req, res) {

        if (!req.file) {
            return res.status(400).send('No image uploaded.');
        }
        const { name, price } = req.body;
        const imagePath = req.file.filename;
        try {
            await Menu.create({ name: name, price: price, images: imagePath });
            req.flash("message", "success create ramen")
            res.redirect("/admin/ramen");
        } catch (error) {
            req.flash("error", error.message);
            res.redirect("/admin/ramen");
        }

    }


    static async aUpdateRamen(req, res) {
        const id = req.params.id;

        try {
            const ramen = await Menu.findById(id);

            if (!ramen) {
                req.flash("error", "Ramen not found.");
                return res.redirect("/admin/ramen");
            }

            // Mengambil data yang diperbarui dari body request
            const { name, price } = req.body;

            // Jika ada file gambar baru diunggah, perbarui path gambar
            if (req.file) {
                const imagePath = req.file.filename;
                ramen.images = imagePath;
            }

            // Update nama dan harga ramen
            ramen.name = name;
            ramen.price = price;

            await ramen.save();

            req.flash("message", "Ramen updated successfully.");
            res.redirect("/admin/ramen");
        } catch (error) {
            req.flash("error", error.message);
            res.redirect("/admin/ramen");
        }
    }

    static async aDeleteRamen(req, res) {
        try {
            const id = req.params.id;

            await Menu.findOneAndDelete(id);
            req.flash("message", "success delete ramen")
            res.redirect("/admin/ramen");
        } catch (error) {
            req.flash("error", error.message);
            res.redirect("/admin/ramen");
        }
    }


    static async aEditRamen(req, res) {

        const id = req.params.id;

        const menu = await Menu.findOne({
            _id: id
        })
        res.render('admin/menu/edit', { menu });
    }





}

module.exports = MenuController;