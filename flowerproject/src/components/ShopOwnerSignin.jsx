import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Eye Icons
import "../assets/css/shopOwnerSignin.css"; // ✅ Import CSS

const ShopOwnerSignin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle State
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/shop-owner/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        navigate(`/shop-owner/profile/${data.user.id}`); // Redirect to profile page
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shopowner-container">
      <div className="shopowner-card">
        <h1 className="shopowner-heading">Shop Owner Sign-In</h1>
        <p className="shopowner-text">Manage your store with ease.</p>

        <form className="shopowner-form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button className="shopowner-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Sign In"}
          </button>

          <p className="auth-link">
            Don't have an account? <a href="/shop-owner/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ShopOwnerSignin;
