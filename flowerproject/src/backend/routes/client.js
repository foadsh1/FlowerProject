const express = require("express");
const db = require("../db");
const router = express.Router();

// ✅ Get User Profile by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT id, name, email, city, phone, address FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error." });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      const user = results[0];
      res.json(user);
    }
  );
});

// ✅ Update User Profile
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, city, phone, address } = req.body;

  if (!name || !city || !phone || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.query(
    "UPDATE users SET name = ?, city = ?, phone = ?, address = ? WHERE id = ?",
    [name, city, phone, address, id],
    (err, result) => {
      if (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ error: "Database error." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      res.json({ message: "Profile updated successfully." });
    }
  );
});

module.exports = router;
