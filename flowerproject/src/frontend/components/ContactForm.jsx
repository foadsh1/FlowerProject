import React, { useState } from "react";
import "../assets/css/contact.css"; // ✅ Import CSS

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/contact/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess("Your message has been sent successfully!");
      setError(null);
      setFormData({ name: "", email: "", message: "" });
    } else {
      setError(data.error || "Failed to send the message.");
      setSuccess(null);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button className="contact-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
