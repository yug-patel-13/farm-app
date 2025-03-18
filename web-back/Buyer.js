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
    return;
  }
  console.log('Connected to database.');

});

app.get("/",(req,res)=>{
  res.send(`<script>alert("connected to server")</script>`)
})
// GET route for fetching all data from the buyer table
app.get('/api/buyer', (req, res) => {
  const query = 'SELECT * FROM buyer';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

// POST route for inserting new data into the buyer table
app.post('/api/buyer', (req, res) => {
  const { buyerName, buyerNumber, buyerEmail, requiredCrop, district} = req.body;

  // Basic validation
  if (!buyerName || !buyerNumber || !buyerEmail || !requiredCrop ||  !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO buyer (buyerName, buyerNumber, buyerEmail, requiredCrop, district) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [buyerName, buyerNumber, buyerEmail, requiredCrop, district], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, message: 'buyer information added successfully', result });
  });
});

// PUT route for updating a user's data
app.put('/api/buyer/:id', (req, res) => {
  const { id } = req.params;
  const { buyerName, buyerNumber, buyerEmail, requiredCrop, district} = req.body;

  // Basic validation
  if (!buyerName || !buyerNumber || !buyerEmail || !requiredCrop || !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'UPDATE buyer SET buyerName = ?, buyerNumber = ?, buyerEmail = ?, requiredCrop = ?, district = ?,  WHERE id = ?';
  db.query(query, [buyerName, buyerNumber, buyerEmail, requiredCrop, district, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'User updated successfully', result });
  });
});

// DELETE route for deleting a user by ID
app.delete('/api/buyer/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM buyer WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'User deleted successfully', result });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
