class Midleware {




    static async isAdmin(req, res, next) {
        if (req.session && req.session.admin) {
            next();
        } else {
            // Token tidak ada, kirim respons dengan status 401 (Unauthorized)
            req.flash('error', 'please login');
            res.redirect('/admin/login');
        }
    }

    static async isUser(req, res, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            // Token tidak ada, kirim respons dengan status 401 (Unauthorized)
            req.flash('error', 'please login');
            res.redirect('/login');
        }
    }


}


module.exports = Midleware