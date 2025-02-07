const express = require("express");
const db = require("../db");
const router = express.Router();

// Get User Profile & Orders
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT name, email, city, phone, address FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });
      if (results.length === 0)
        return res.status(404).json({ error: "User not found." });

      const user = results[0];

      db.query(
        "SELECT * FROM orders WHERE user_id = ?",
        [id],
        (err, orders) => {
          if (err) return res.status(500).json({ error: "Database error." });
          res.json({ ...user, orders });
        }
      );
    }
  );
});

// Update User Profile
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, city, phone, address } = req.body;

  db.query(
    "UPDATE users SET name = ?, city = ?, phone = ?, address = ? WHERE id = ?",
    [name, city, phone, address, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Profile updated successfully." });
    }
  );
});

module.exports = router;
