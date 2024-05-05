const { User } = require("../model/Index");
const bcrypt = require('bcrypt');



class UserController {


    static async aUsers(req, res) {
        const users = await User.find();
        // console.log(req.flash('message'));
        res.render('admin/user/user', { users, message: req.flash('message') });
    }


    static async aAddUser(req, res) {
        const { username, password, email, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await User.create({
                email: email,
                password: hashedPassword,
                username: username,
                role: role
            });

            // Send flash message
            req.flash('message', 'User successfully added.');
            res.redirect('/admin/users'); // Redirect to user list page
        } catch (error) {
            console.error(error);
            res.status(500).send("Error creating user");
        }
    }



    static async aDeleteUser(req, res) {
        const id = req.params.id

        try {
            await User.findByIdAndDelete(id)
            req.flash('message', 'user delete success.');
            res.redirect('/admin/users'); // Redirect to user list page
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async aEditUser(req, res) {
        const id = req.params.id

        try {
            const user = await User.findOne({
                _id: id
            })
            res.render("admin/user/edit", { user });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async aUpdateUser(req, res) {
        const id = req.params.id;
        const { username, password, email, role } = req.body;



        try {
            const user = await User.findOne({ _id: id });

            if (!user) {
                return res.status(404).send("User not found");
            }


            // Update user
            user.username = username;
            user.email = email;
            user.role = role;
            user.password = await bcrypt.hash(password, 10)

            await user.save();

            req.flash('message', 'User updated successfully.');
            res.redirect('/admin/users'); // Redirect to user list page
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }


    static async loginAdmin(req, res) {
        const { email, password } = req.body;

        try {
            // Cari admin berdasarkan email
            const user = await User.findOne({ email: email });

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    if (user.role != 'admin') {
                        throw new Error("account anda bukan admin")
                    }
                    req.session.admin = user;
                    return res.redirect('/admin/dashboard');
                } else {
                    throw new Error("password salah")
                }
            }
            throw new Error("Ops user tidak ditemukan")
        } catch (error) {

            req.flash('error', error.message)
            res.redirect('/admin/login');
        }
    }


    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            // Cari admin berdasarkan email
            const user = await User.findOne({ email: email });

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    if (user.role != 'user') {
                        throw new Error("account anda bukan user")
                    }
                    req.session.user = user;
                    return res.redirect('/Menu');
                } else {
                    throw new Error("password salah")
                }
            }
            throw new Error("Ops user tidak ditemukan")
        } catch (error) {
            req.flash('error', error.message)
            res.redirect('/login');
        }
    }


    static async register(req, res) {
        const { username, password, email } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await User.create({
                email: email,
                password: hashedPassword,
                username: username,
                role: 'user'
            });

            // Send flash message
            req.flash('message', 'User successfully added.');
            res.redirect('/login'); // Redirect to user list page
        } catch (error) {
            req.flash("error", error.message);
            res.redirect('/register')
        }
    }


    static async logoutAdmin(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Gagal menghapus sesi:", err);
            } else {
                console.log("Sesi admin berhasil dihapus");
                // Redirect ke halaman login setelah berhasil logout
                res.redirect("/admin/login");
            }
        });
    }



}

module.exports = UserController;