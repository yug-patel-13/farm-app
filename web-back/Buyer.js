const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'buyer'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    process.exit(1); // Exit if connection fails
  }
  console.log('Connected to database.');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// GET all buyers
app.get('/api/buyer', (req, res) => {
  const query = 'SELECT * FROM buyer';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST: Add new buyer
app.post('/api/buyer', (req, res) => {
  const { buyerName, buyerNumber, buyerEmail, requiredCrop, district } = req.body;

  if (!buyerName || !buyerNumber || !buyerEmail || !requiredCrop || !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO buyer (buyerName, buyerNumber, buyerEmail, requiredCrop, district) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [buyerName, buyerNumber, buyerEmail, requiredCrop, district], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'Buyer information added successfully', result });
  });
});

// PUT: Update buyer by ID
app.put('/api/buyer/:id', (req, res) => {
  const { id } = req.params;
  const { buyerName, buyerNumber, buyerEmail, requiredCrop, district } = req.body;

  if (!buyerName || !buyerNumber || !buyerEmail || !requiredCrop || !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'UPDATE buyer SET buyerName = ?, buyerNumber = ?, buyerEmail = ?, requiredCrop = ?, district = ? WHERE id = ?';
  db.query(query, [buyerName, buyerNumber, buyerEmail, requiredCrop, district, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Buyer not found' });
    }

    res.json({ success: true, message: 'Buyer updated successfully', result });
  });
});

// DELETE: Delete buyer by ID
app.delete('/api/buyer/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM buyer WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Buyer not found' });
    }

    res.json({ success: true, message: 'Buyer deleted successfully', result });
  });
});

module.exports = app;
