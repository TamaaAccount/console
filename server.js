require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Serve frontend
app.use(express.static("public"));

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

// Proteksi middleware
const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).json({ message: "Akses ditolak!" });
    }
    next();
};

// Terminal Live
app.post("/terminal", authMiddleware, (req, res) => {
    const { command } = req.body;
    exec(command, (error, stdout, stderr) => {
        if (error) return res.json({ output: stderr });
        res.json({ output: stdout });
    });
});

// File Manager
const BASE_DIR = path.join(__dirname, "files");
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR);

app.get("/files", authMiddleware, (req, res) => {
    fs.readdir(BASE_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ files });
    });
});

app.post("/upload", authMiddleware, (req, res) => {
    const { filename, content } = req.body;
    fs.writeFile(path.join(BASE_DIR, filename), content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "File uploaded!" });
    });
});

app.delete("/delete", authMiddleware, (req, res) => {
    const { filename } = req.body;
    fs.unlink(path.join(BASE_DIR, filename), (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "File deleted!" });
    });
});

// WebSocket untuk log monitoring
const server = app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    const logStream = exec("tail -f log.txt");
    logStream.stdout.on("data", (data) => ws.send(data.toString()));
    ws.on("close", () => logStream.kill());
});
