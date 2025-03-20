const app = require("./Farmer.js"); // Import buyer.js
const port = 4000;

// Route to display message when accessing the root URL
app.get("/", (req, res) => {
    res.send("Hello, running!");
  });
  const cors = require("cors");

app.use(cors({
  origin: "https://farm-app-nine.vercel.app/",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
