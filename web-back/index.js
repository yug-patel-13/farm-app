const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://farm-app-fk44.vercel.app", // Allow frontend domain
    methods: "GET, POST, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://farm-app-fk44.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

// ✅ Import and use routes from Farmer.js
const farmerRoutes = require("./Farmer.js");
app.use(farmerRoutes);

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Hello, running!");
});

// ✅ Start server
const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
