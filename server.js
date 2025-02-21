require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Ubah ke true jika pakai HTTPS
    })
);

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.user = username;
        return res.json({ success: true, message: "Login berhasil!" });
    }
    res.status(401).json({ success: false, message: "Login gagal!" });
});

// Cek sesi login
app.get("/me", (req, res) => {
    if (req.session.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    }
    res.status(401).json({ loggedIn: false });
});

// Logout API
app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true, message: "Logout berhasil!" });
    });
});

// Proteksi halaman admin
app.get("/admin", (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ message: "Akses ditolak!" });
    }
    res.json({ message: "Selamat datang di panel admin!" });
});

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
