const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;
  
// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
// Serve React build files (optional for production)
console.log(path.join(__dirname, "../../build"));
app.use(express.static(path.join(__dirname, "../../build")));

// API Routes
app.use("/auth", authRoutes);


// Fallback for React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});
app.post("/auth/signin", (req, res) => {
  // Process login and send JSON response
  res.json({ message: "Logged in successfully", user: userData });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
