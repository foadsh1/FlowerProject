import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/shopOwnerProducts.css"; // Use same styles as product list

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setFormData(data);
          setPreview(`http://localhost:5000${data.image}`);
        } else {
          setError(data.error || "Failed to fetch product details.");
        }
      } catch (err) {
        setError("An error occurred while fetching product details.");
      }
    };

    fetchProductDetails();
  }, [id]);

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
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/products/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess("Product updated successfully!");
        setTimeout(() => navigate("/shop-owner/products"), 2000);
      } else {
        setError(data.error || "Failed to update product.");
      }
    } catch (err) {
      setError("An error occurred while updating product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shop-products-container">
      <h1>Edit Product</h1>
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Product Preview"
              className="preview-image"
            />
          )}
        </div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
