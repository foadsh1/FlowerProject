const express = require("express");
const db = require("../db");
const router = express.Router();

// ✅ 1. Get All Products (Return Full Image URL)
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    // ✅ Add Full URL for Each Image
    const fullResults = results.map((product) => ({
      ...product,
      image: `http://localhost:5000${product.image}`, // Attach full path to image
    }));

    res.json(fullResults);
  });
});

// ✅ 2. Get Single Product by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found." });

    // ✅ Return Product with Full Image URL
    const product = results[0];
    product.image = `http://localhost:5000${product.image}`;
    res.json(product);
  });
});

// ✅ 3. Add a New Product with Image URL
router.post("/add", (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ error: "All fields are required." });
  }

  db.query(
    "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Product added successfully.", id: result.insertId });
    }
  );
});

// ✅ 4. Update a Product (Keep Existing Image if No New One is Provided)
router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  let { name, price, image } = req.body;

  // ✅ Fetch the existing image if no new image is uploaded
  db.query("SELECT image FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found." });

    const existingImage = results[0].image;

    // ✅ If no new image is uploaded, use the existing one
    if (!image) image = existingImage;

    db.query(
      "UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?",
      [name, price, image, id],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error." });
        res.json({ message: "Product updated successfully." });
      }
    );
  });
});

// ✅ 5. Delete a Product
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json({ message: "Product deleted successfully." });
  });
});

module.exports = router;
