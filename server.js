// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware with CORS for your GitHub Pages domain
app.use(cors({
    origin: 'https://harikesh0501.github.io', // allow your GitHub Pages frontend
    methods: ['POST']
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ MySQL connection using Railway credentials (external/public access)
const db = mysql.createPool({
    host: 'turntable.proxy.rlwy.net',
    user: 'root',
    password: 'LswueuXLhqFqzfOquVIXepabDtchL0bk',
    database: 'railway',
    port: 19548, // important: Railway public port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// API route: POST /contact
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'INSERT INTO about (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Insert error:', err);
            return res.status(500).send('Database error');
        }
        res.status(200).send('✅ Message received and saved to database!');
    });
});

// Health Check route
app.get('/health', (req, res) => {
    res.send('Server is healthy and running');
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
