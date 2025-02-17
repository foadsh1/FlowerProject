const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// ✅ User Signup with City, Phone, and Address
router.post("/signup", async (req, res) => {
  const { name, email, password, shopName, location, image, moreInfo } =
    req.body;

  if (
    !name ||
    !email ||
    !password ||
    !shopName ||
    !location ||
    !image ||
    !moreInfo
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // 🔹 בדיקת מורכבות הסיסמה
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain both letters and numbers.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO shop_owners (name, email, password, shop_name, location, image, more_info) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [name, email, hashedPassword, shopName, location, image, moreInfo],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Email already exists." });
          }
          return res.status(500).json({ error: "Database error." });
        }
        res.json({ message: "Shop Owner registered successfully!" });
      }
    );
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
