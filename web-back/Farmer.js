const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection setup
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'farmer'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Default route
app.get('/', (req, res) => {
  res.send("Farmer API is running...");
});

// GET all farmers
app.get('/api/farmer', (req, res) => {
  const query = 'SELECT * FROM farmer';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
});

// POST new farmer
app.post('/api/farmer', (req, res) => {
  const { name, number, email, cropName, district } = req.body;
  if (!name || !number || !email || !cropName || !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO farmer (name, number, email, cropname, district) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, number, email, cropName, district], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'Farmer added successfully', result });
  });
});

// PUT (Update farmer)
app.put('/api/farmer/:id', (req, res) => {
  const { id } = req.params;
  const { name, number, email, cropName, district } = req.body;

  if (!name || !number || !email || !cropName || !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'UPDATE farmer SET name = ?, number = ?, email = ?, cropname = ?, district = ? WHERE id = ?';
  db.query(query, [name, number, email, cropName, district, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Farmer updated successfully', result });
  });
});

// DELETE farmer
app.delete('/api/farmer/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM farmer WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Farmer deleted successfully', result });
  });
});

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

module.exports = app;
