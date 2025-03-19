const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const bodyparser = require("body-parser");

const app = express();
const port = process.env.PORT || 3111;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "agritech",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed", err.stack);
    process.exit(1);
  }
  console.log("Connected to database.");
});

// Root route
app.get("/", (req, res) => {
  res.send("Connected to Agritech API");
});

// Fetch all users
app.get("/api/agritech", (req, res) => {
  const query = "SELECT * FROM agritech";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Register new user
app.post("/api/agritech", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO agritech (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, email });
  });
});

// User login
app.post("/api/agritech/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM agritech WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// Update user
app.put("/api/agritech/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "UPDATE agritech SET name=?, email=?, password=? WHERE id=?";
  db.query(query, [name, email, password, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, message: "User updated successfully" });
  });
});

// Delete user
app.delete("/api/agritech/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM agritech WHERE id=?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  });
});

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;