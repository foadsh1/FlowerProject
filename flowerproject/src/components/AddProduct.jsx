import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/productFormStyles.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //  Preview image
    setPreview(URL.createObjectURL(file));

    //  Upload image to server
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.imageUrl) {
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => navigate("/products"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="price"
        onChange={handleChange}
        placeholder="Price"
        required
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
