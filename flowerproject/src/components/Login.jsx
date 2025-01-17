import React, { useState } from "react";
import "../assets/css/globalStyles.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    // Mock API Call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Logged in successfully!");
    }, 1000);
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
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
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
