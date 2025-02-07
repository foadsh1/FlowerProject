import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const ShopOwnerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    location: "",
    image: null,
    moreInfo: "",
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

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: imageForm,
    });

    const data = await response.json();
    if (data.imageUrl) {
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.shopName ||
      !formData.location ||
      !formData.moreInfo
    ) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/shop-owner/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Shop Owner registered successfully!");
        navigate("/shop-owner/signin");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Shop Owner Sign-Up</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shopName">Shop Name</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            placeholder="Enter your shop name"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter shop location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="moreInfo">More About Shop</label>
          <textarea
            id="moreInfo"
            name="moreInfo"
            placeholder="Describe your shop"
            value={formData.moreInfo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Shop Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Shop Preview"
              className="auth-preview-image"
            />
          )}
        </div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Sign Up"}
        </button>
        <div className="form-group">
          Already have an account? <a href="/shop-owner/signin">Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default ShopOwnerSignup;
