const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Shop Owner Signup
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

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO shop_owners (name, email, password, shop_name, location, image, more_info) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, shopName, location, image, moreInfo],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error." });
        res.json({ message: "Shop Owner registered successfully." });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// Shop Owner Sign-In
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Both email and password are required." });
  }

  db.query(
    "SELECT * FROM shop_owners WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });
      if (results.length === 0)
        return res.status(400).json({ error: "Shop Owner not found." });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ error: "Invalid credentials." });

      res.json({ message: "Login successful!", user });
    }
  );
});

// Fetch all registered flower shops
router.get("/all", (req, res) => {
  db.query(
    "SELECT id, shop_name, location, image, more_info FROM shop_owners",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });

      res.json(results);
    }
  );
});

// Fetch details for a single flower shop along with its products
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const shopQuery =
    "SELECT shop_name, location, image, more_info FROM shop_owners WHERE id = ?";
  const productsQuery =
    "SELECT id, name, price, image FROM products WHERE shop_owner_id = ?";

  db.query(shopQuery, [id], (err, shopResults) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Database error fetching shop details." });
    if (shopResults.length === 0)
      return res.status(404).json({ error: "Shop not found." });

    const shopData = shopResults[0];

    db.query(productsQuery, [id], (err, productResults) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Database error fetching products." });

      res.json({ ...shopData, products: productResults });
    });
  });
});

// Update shop owner details
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { shopName, location, image, moreInfo } = req.body;

  db.query(
    "UPDATE shop_owners SET shop_name = ?, location = ?, image = ?, more_info = ? WHERE id = ?",
    [shopName, location, image, moreInfo, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Shop information updated successfully." });
    }
  );
});

// Delete shop owner and their products
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE shop_owner_id = ?", [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Database error deleting products." });

    db.query("DELETE FROM shop_owners WHERE id = ?", [id], (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Database error deleting shop owner." });

      res.json({ message: "Shop owner and products deleted successfully." });
    });
  });
});

module.exports = router;
