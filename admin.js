const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('./server/model/Index');

// Fungsi untuk menghubungkan ke database
mongoose.connect("mongodb://localhost:27017/ramen")
    .then(() => {
        console.log("Database Connected Successfully");
        // Buat data admin setelah koneksi berhasil
        createAdmin();
    })
    .catch((error) => {
        console.log("Database cannot be Connected", error);
    });

// Fungsi untuk membuat data admin
async function createAdmin() {
    try {
        // Cek apakah admin sudah ada dalam database
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (!existingAdmin) {
            // Jika admin belum ada, buat data admin baru
            const hashedPassword = await bcrypt.hash('123456', 10);
            const adminData = {
                username: 'admin',
                password: hashedPassword,
                email: 'admin@example.com',
                role: 'admin'
            };
            const newAdmin = await User.create(adminData);
            console.log('Admin berhasil ditambahkan:', newAdmin);
        } else {
            console.log('Admin sudah ada dalam database:', existingAdmin);
        }
    } catch (error) {
        console.error('Gagal menambahkan admin:', error);
    } finally {
        // Tutup koneksi setelah selesai
        mongoose.connection.close();
    }
}
