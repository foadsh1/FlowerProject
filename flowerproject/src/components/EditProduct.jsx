import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = ({ products, updateProduct }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Ensure useState is always called, even if productId is missing
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");

  // If no productId is found, immediately return a loading message
  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing");
      return;
    }

    const product = products.find((p) => p.id === parseInt(productId, 10));
    if (product) {
      setFormData(product);
    } else {
      setError("Product not found.");
      navigate("/products");
    }
  }, [productId, products, navigate]);

  if (!formData) {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      setError("All fields are required.");
      return;
    }

    updateProduct(formData); // Update the product
    navigate("/products");
  };

  return (
    <div className="edit-product">
      <h1>Edit Product</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <img src={formData.image} alt="Preview" className="preview-image" />
          )}
        </div>
        <button type="submit" className="btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
