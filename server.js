// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); // <-- Add this line

// Create Express app
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, images, etc.)
app.use(express.static(__dirname));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hetu@512007', // ⚠️ Never hardcode passwords in production
    database: 'aboutdb'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL');
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

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});