const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// ✅ Shop Owner Signup Route (Fix)
router.post("/signup", async (req, res) => {
  const { name, email, password, shopName, location, moreInfo } = req.body;

  if (!name || !email || !password || !shopName || !location || !moreInfo) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO shop_owners (name, email, password, shop_name, location, more_info) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, email, hashedPassword, shopName, location, moreInfo], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists." });
        }
        return res.status(500).json({ error: "Database error." });
      }

      res.json({ message: "Shop Owner registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// ✅ Shop Owner Sign-In Route (Fix)
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Both email and password are required." });
  }

  const sql = "SELECT * FROM shop_owners WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length === 0) {
      return res.status(400).json({ error: "Shop not found." });
    }

    const user = results[0];

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
        shopName: user.shop_name,
        location: user.location,
        moreInfo: user.more_info,
      },
    });
  });
});

module.exports = router;
