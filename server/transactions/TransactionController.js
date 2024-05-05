const { default: mongoose } = require("mongoose");
const { Transaction } = require("../model/Index");

class TransactionController {


    static async checkout(req, res) {
        const { body, address, notes, table_number, cart_data } = req.body;

        try {
            const cartDataObj = JSON.parse(cart_data);
            const user = req.session.user;
            console.log(user)

            // Ubah objek JavaScript menjadi array
            const cartDataArray = Object.keys(cartDataObj).map(menuId => {
                const menuItem = cartDataObj[menuId];
                return {
                    id: menuId,
                    name: menuItem.name,
                    images: menuItem.images,
                    price: menuItem.price,
                    quantity: menuItem.quantity
                };
            });


            let cartItems = [];

            let total = 0


            cartDataArray.map((item, index) => {
                let tempProduct = {
                    product: item.id,
                    quantity: item.quantity,
                    sub_total: item.quantity * item.price
                }
                total += tempProduct.sub_total;
                cartItems.push(tempProduct)
            })


            await Transaction.create({
                items: cartItems,
                noMeja: table_number,
                status: false,
                total: total,
                transactionDate: new Date(),
                user: user._id,
                catatan: notes,
                address: address
            })
            req.flash('message', "Success checkout");
            res.redirect('/Pemesanan');
        } catch (error) {
            console.log(error)
            req.flash('error', error.message);
            res.redirect('/Cart');
        }
    }



    static async getByUserId(req, res) {
        const user = req.session.user;
        console.log(user)
        const transactions = await Transaction.find({ user: user._id }).populate('user').populate('items.product');

        res.render("Pemesanan", { transactions });
    }

    static async cancel(req, res) {
        const id = req.params.id;
        await Transaction.findOneAndDelete(id)
        res.redirect('/Pemesanan')
    }


    static async aTranactions(req, res) {
        const transactions = await Transaction.find()
            .populate('user')
            .populate('items.product')

            .sort({ transactionDate: -1 }); // Mengurutkan berdasarkan tanggal transaksi (dari yang terbaru)
        res.render('admin/transactions/index', { transactions, message: req.flash('message'), error: req.flash('error') });

    }



    static async approve(req, res) {
        try {
            const id = req.params.id;

            // Temukan transaksi berdasarkan ID dan perbarui statusnya menjadi disetujui
            const updatedTransaction = await Transaction.findByIdAndUpdate(id, { status: true }, { new: true });

            if (!updatedTransaction) {
                // Jika transaksi tidak ditemukan, kirim respons 404
                req.flash('error', "Transaksi not foun")
                res.redirect('/admin/transactions');
            }
            // Jika berhasil diperbarui, kirim respons 200
            req.flash('message', 'success menyelesaikan pesanan')
            res.redirect('/admin/transactions');
        } catch (error) {
            // Tangani kesalahan
            req.flash('error', error.message)
            res.redirect('/admin/transactions');
        }
    }



    static async decline(req, res) {
        const id = req.params.id;

        await Transaction.findOneAndDelete(id);

        req.flash("message", "success tolak pesanan")
        res.redirect('/admin/transactions');
    }

}

module.exports = TransactionController;