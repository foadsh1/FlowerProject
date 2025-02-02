const express = require("express");
const db = require("../db"); // Database connection
const router = express.Router();

// Sign-Up Route
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already exists." });
      }
      return res.status(500).json({ error: "Database error." });
    }
    res.json({ message: "User registered successfully." });
  });
});
// Sign-In Route
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Both email and password are required." });
  }

  const sql =
    "SELECT id, NAME AS name, email, PASSWORD AS password FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error." });
    }

    console.log("Results from database:", results);

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found." });
    }

    const user = results[0];

    console.log("Provided password:", password);
    console.log("Stored password:", user.password);

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    res.json({
      message: "Logged in successfully.",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});


module.exports = router;
