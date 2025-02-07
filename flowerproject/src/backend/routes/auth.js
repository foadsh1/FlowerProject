const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// ✅ User Signup with City, Phone, and Address
router.post("/signup", async (req, res) => {
  const { name, email, password, city, phone, address } = req.body;

  if (!name || !email || !password || !city || !phone || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // ✅ Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, email, password, city, phone, address) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, city, phone, address], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists." });
        }
        return res.status(500).json({ error: "Database error." });
      }
      res.json({ message: "User registered successfully." });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ User Signin (Returns City, Phone, and Address)
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Both email and password are required." });
  }

  const sql =
    "SELECT id, name, email, password, city, phone, address FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found." });
    }

    const user = results[0];

    // ✅ Compare hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    res.json({
      message: "Logged in successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.city,
        phone: user.phone,
        address: user.address,
      },
    });
  });
});

module.exports = router;
