const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const authRoutes = require("./routes/auth");
const shopOwnerRoutes = require("./routes/shopOwner");
const productRoutes = require("./routes/products");
const contactRoutes = require("./routes/contact");
const clientRoutes = require("./routes/client"); // ✅ Ensure Client Routes are included

const app = express();
const PORT = 5000;

// Ensure `uploads/` directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../build")));

// Serve Uploaded Images
app.use("/uploads", express.static(uploadDir));

// API Routes
app.use("/auth", authRoutes);
app.use("/shop-owner", shopOwnerRoutes);
app.use("/products", productRoutes);
app.use("/contact", contactRoutes);
app.use("/client", clientRoutes); // ✅ Fix: Add Client Routes for user updates

// Image Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Fallback for React App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
