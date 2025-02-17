const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// ✅ Shop Owner Signup
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

  // 🔹 Password must be at least 8 characters long and contain both letters and numbers
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


// ✅ Shop Owner Sign-In
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Both email and password are required." });
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
        image: user.image,
        moreInfo: user.more_info,
      },
    });
  });
});

// ✅ Fetch all flower shops
router.get("/all", (req, res) => {
  const sql =
    "SELECT id, shop_name, location, image, more_info FROM shop_owners";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(results);
  });
});

// ✅ Fetch a single shop along with its products
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const shopQuery = `
    SELECT id, name AS ownerName, email, shop_name AS shopName, location, image, more_info AS moreInfo
    FROM shop_owners 
    WHERE id = ?`;

  const productsQuery = `
    SELECT id, name, price, image 
    FROM products 
    WHERE shop_owner_id = ?`;

  db.query(shopQuery, [id], (err, shopResults) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database error fetching shop details." });
    }
    if (shopResults.length === 0) {
      return res.status(404).json({ error: "Shop not found." });
    }

    const shopData = shopResults[0];

    db.query(productsQuery, [id], (err, productResults) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error fetching products." });
      }

      res.json({ ...shopData, products: productResults });
    });
  });
});

// ✅ Update shop owner details (Retains Old Image If No New Image is Uploaded)
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { shopName, location, image, moreInfo } = req.body;

  // Fetch current image before updating
  db.query(
    "SELECT image FROM shop_owners WHERE id = ?",
    [id],
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Database error retrieving current image." });

      const oldImage = results[0]?.image || ""; // Get the existing image if available

      const sql = `
      UPDATE shop_owners 
      SET shop_name = ?, location = ?, image = ?, more_info = ? 
      WHERE id = ?`;

      db.query(
        sql,
        [shopName, location, image || oldImage, moreInfo, id],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Database error updating shop details." });

          res.json({ message: "Shop information updated successfully." });
        }
      );
    }
  );
});

// ✅ Delete shop owner and their products
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  // First, delete products associated with the shop owner
  db.query("DELETE FROM products WHERE shop_owner_id = ?", [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Database error deleting products." });

    // Then delete the shop owner
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
