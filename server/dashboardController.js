const { User, Menu, Transaction } = require("./model/Index");

class DashboardController {

    static async dashboard(req, res) {
        const user = await User.countDocuments();
        const menu = await Menu.countDocuments();
        const transaction = await Transaction.countDocuments();

        res.render("admin/dashboard", {
            user, menu, transaction
        });
    }

}

module.exports = DashboardController