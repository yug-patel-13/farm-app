const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const bodyparser = require("body-parser");

const app = express();
const port = 3111;

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
    return;
  }
  console.log("Connected to database.");
});

app.get("/", (req, res) => {
  res.send("connected");
});

// Fetch all users
app.get("/api/agritech", (req, res) => {
  const query = `SELECT * FROM agritech`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Register new user
app.post("/api/agritech", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO agritech (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, name, email });
  });
});

// User login
app.post("/api/agritech/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM agritech WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

// Update user
app.put("/api/agritech/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const query = "UPDATE agritech SET name=?, email=?, password=? WHERE id=?";
  db.query(query, [name, email, password, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

// Delete user
app.delete("/api/agritech/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM agritech WHERE id=?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
