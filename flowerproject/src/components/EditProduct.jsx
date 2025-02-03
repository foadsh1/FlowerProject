import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", price: "", image: "" });
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null); // ✅ Store existing image

  useEffect(() => {
    // ✅ Fetch Product Data from Backend
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({ name: data.name, price: data.price, image: data.image });
        setExistingImage(data.image); // ✅ Store the original image
        setPreview(data.image); // ✅ Show current image
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // ✅ Handle Form Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // ✅ Preview new image

    // ✅ Upload new image to server
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

  // ✅ Handle Update Product (Keep Existing Image)
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ If no new image is uploaded, keep the existing one
    const updatedProduct = {
      name: formData.name,
      price: formData.price,
      image: formData.image !== "" ? formData.image : existingImage, // ✅ Keep existing image
    };

    fetch(`http://localhost:5000/products/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    }).then(() => navigate("/products"));
  };

  // ✅ Handle Delete Product
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/products/delete/${id}`, { method: "DELETE" })
        .then(() => navigate("/products"))
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Product</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <img
          src={preview}
          alt="Product Preview"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}
      {!preview && existingImage && (
        <img
          src={existingImage}
          alt="Current Product"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}

      <button type="submit">Update Product</button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ backgroundColor: "red", color: "white", marginTop: "10px" }}
      >
        Delete Product
      </button>
    </form>
  );
};

export default EditProduct;
