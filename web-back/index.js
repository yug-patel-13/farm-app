const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors({
    origin: "https://farm-app-fk44.vercel.app", // Change * to frontend domain for security
    methods: "GET, POST",
    credentials: true
}));

app.use(express.json()); // Ensure JSON body parsing

// ✅ Import and use routes from Farmer.js (if it contains routes)
const farmerRoutes = require("./Farmer.js");
app.use(farmerRoutes);

// ✅ Define test route
app.get("/", (req, res) => {
    res.send("Hello, running!");
});

// ✅ Start server
const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
