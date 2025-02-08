import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/shopOwnerSignin.css"; // ✅ Import CSS
import { Link } from "react-router-dom";
const ShopOwnerSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/shop-owner/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Shop Owner Data:", data.user);

        // ✅ Clear any existing client session before saving the shop owner session
        localStorage.removeItem("user");
        localStorage.setItem("shopOwner", JSON.stringify(data.user));

        navigate(`/shop-owner/profile/${data.user.id}`);
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

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="shopowner-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-link">
                    Don't have an account? <Link to="/shop-owner/signup">Sign Up</Link>
                    </p>
      </div>
    </div>
  );
};

export default ShopOwnerSignin;
