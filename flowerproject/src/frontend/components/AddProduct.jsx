import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/shopOwnerProducts.css"; // Reuse the same styles

const AddProduct = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const shopOwnerId = storedUser ? storedUser.id : null;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const imageForm = new FormData();
    imageForm.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: imageForm,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      }
    } catch (err) {
      setError("Failed to upload image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopOwnerId) {
      setError("You must be logged in as a shop owner to add products.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const newProduct = { ...formData, shop_owner_id: shopOwnerId };

    try {
      const response = await fetch("http://localhost:5000/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Product added successfully!");
        setTimeout(() => navigate("/shop-owner/products"), 2000);
      } else {
        setError(data.error || "Failed to add product.");
      }
    } catch (err) {
      setError("An error occurred while adding product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shop-products-container">
      <h1>Add New Product</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="shop-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Product Preview"
              className="preview-image"
            />
          )}
        </div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
