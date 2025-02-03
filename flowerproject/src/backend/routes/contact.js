const express = require("express");
const db = require("../db"); //  Import database connection
const router = express.Router();

//  Handle Contact Form Submission
router.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql =
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error." });

    res.json({ message: "Message sent successfully!" });
  });
});

//  Retrieve All Contact Messages
router.get("/messages", (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });

      res.json(results);
    }
  );
});

module.exports = router;
