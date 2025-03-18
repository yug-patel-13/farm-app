const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection setup
const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your password if needed
  database: 'farmer'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Default route for root URL
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Saved Data</title>
  <style>.data-container {
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  .data-table th, .data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .data-table th {
    background-color: #f2f2f2;
    color: black;
  }
  
  .data-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .data-table tr:hover {
    background-color: #ddd;
  }
  </style>
</head>
<body>
  <div class="data-container">
    <h1>farmer Data</h1>
    <table class="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>cropname</th>
          <th>city</th>
        </tr>
      </thead>
      <tbody id="data-body">
        <!-- Data will be inserted here by JavaScript -->
      </tbody>
    </table>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      const response = await fetch('/api/farmer');
      const data = await response.json();
    
      const dataBody = document.getElementById('data-body');
      data.forEach(item => {
        const row = document.createElement('tr');
    
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
    
        const emailCell = document.createElement('td');
        emailCell.textContent = item.email;
        row.appendChild(emailCell);
    
        const passwordCell = document.createElement('td');
        passwordCell.textContent = item.cropname;
        row.appendChild(passwordCell);
    
        const emaill=document.createElement('td');
        emaill.textContent=item.district
        row.appendChild(emaill)

        dataBody.appendChild(row);
      });
    });
  </script>
</body>
</html>`);
});

// GET route for fetching all data from the farmer table
app.get('/api/farmer', (req, res) => {
  const query = 'SELECT * FROM farmer';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// POST route for inserting new data into the farmer table
app.post('/api/farmer', (req, res) => {
  const { name, number, email, cropName, district } = req.body;

  if (!name || !number || !email || !cropName || !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO farmer (name, number, email, cropname, district) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, number, email, cropName, district], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, message: 'Farmer information added successfully', result });
  });
});

// PUT route for updating a farmer's data
app.put('/api/farmer/:id', (req, res) => {
  const { id } = req.params;
  const { name, number, email, cropName, district } = req.body;

  if (!name || !number || !email || !cropName || !district) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'UPDATE farmer SET name = ?, number = ?, email = ?, cropname = ?, district = ? WHERE id = ?';
  db.query(query, [name, number, email, cropName, district, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Farmer information updated successfully', result });
  });
});

// DELETE route for deleting a farmer by ID
app.delete('/api/farmer/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM farmer WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Farmer information deleted successfully', result });
  });
});

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
