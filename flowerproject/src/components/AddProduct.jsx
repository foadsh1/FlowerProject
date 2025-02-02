import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const addProduct = state?.addProduct;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState("");

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

    const newProduct = {
      id: Date.now(),
      ...formData,
    };

    addProduct(newProduct);
    navigate("/products");
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
