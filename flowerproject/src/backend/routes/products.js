const express = require("express");
const db = require("../db");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Get All Products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(results);
  });
});

// Get Products by Shop Owner ID
router.get("/shop/:shop_owner_id", (req, res) => {
  const { shop_owner_id } = req.params;

  db.query(
    "SELECT * FROM products WHERE shop_owner_id = ?",
    [shop_owner_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json(results);
    }
  );
});

// Get a Single Product
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found." });

    res.json(results[0]);
  });
});

// Add a New Product Linked to a Shop
router.post("/add", (req, res) => {
  const { name, price, image, shop_owner_id } = req.body;

  if (!name || !price || !image || !shop_owner_id) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.query(
    "INSERT INTO products (name, price, image, shop_owner_id) VALUES (?, ?, ?, ?)",
    [name, price, image, shop_owner_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Product added successfully.", id: result.insertId });
    }
  );
});

// Update a Product (Keep Old Image If No New Image is Uploaded)
router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required." });
  }

  // Get the current product image before updating
  db.query("SELECT image FROM products WHERE id = ?", [id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Database error retrieving product." });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found." });

    const oldImage = results[0].image;
    const updateQuery =
      "UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?";
    db.query(
      updateQuery,
      [name, price, image || oldImage, id],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error updating product." });

        // If a new image was uploaded, delete the old image
        if (image && oldImage && oldImage !== image) {
          const imagePath = path.join(__dirname, "..", oldImage);
          if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
              if (err) console.error("Error deleting old image:", err);
            });
          }
        }

        res.json({ message: "Product updated successfully." });
      }
    );
  });
});

// Delete a Product and Remove its Image
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  // Get the product image before deleting
  db.query("SELECT image FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found." });

    const imagePath = results[0].image
      ? path.join(__dirname, "..", results[0].image)
      : null;

    // Delete the product from the database
    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Database error deleting product." });

      // If an image exists, delete it from the server
      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting image:", err);
        });
      }

      res.json({ message: "Product deleted successfully." });
    });
  });
});

module.exports = router;
