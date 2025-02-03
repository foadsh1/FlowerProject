const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = 5000;

//  Create `uploads/` folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//  Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); //  Save images in `uploads/` folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //  Unique filename
  },
});
const upload = multer({ storage });

//  Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../build")));

//  Serve Uploaded Images
app.use("/uploads", express.static(uploadDir));

//  API Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/contact", contactRoutes);

//  Image Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  //  Return the uploaded file URL
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

//  Fallback for React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

//  Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
