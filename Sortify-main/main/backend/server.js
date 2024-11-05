const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, '../db/sortify.db'));

app.use(cors()); // This will enable CORS for all routes
app.use(bodyParser.json());


// Endpoint for Scanner
app.get('/items', (req, res) => {
    db.all('SELECT * FROM items', (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Endpoint for Info
app.get('/Info', (req, res) => {
    db.all('SELECT * FROM info', (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Endpoint for Profile
app.get('/Profile', (req, res) => {
    db.all('SELECT * FROM Profile', (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.post('/scanned', (req, res) => {
    const {Barcode, Name} = req.body;
    db.all(`INSERT INTO scanned_items (Barcode, Name) VALUES ('${Barcode}','${Name}')`, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/scanned', (req, res) => {
    const {Barcode, Name} = req.body;
    db.all(`SELECT * FROM scanned_items`, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});
// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
