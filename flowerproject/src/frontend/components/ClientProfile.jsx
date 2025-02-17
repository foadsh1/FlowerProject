import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/clientProfile.css"; // ✅ Import styling

const ClientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get ID from URL
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!storedUser || storedUser.id !== parseInt(id)) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/client/${id}`);
        const data = await response.json();

        if (response.ok) {
          setUserData({
            name: data.name || "",
            email: data.email || "",
            city: data.city || "",
            phone: data.phone || "",
            address: data.address || "",
          });
        } else {
          setError(data.error || "Failed to fetch user data.");
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/client/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify({ ...storedUser, ...userData })); // ✅ Update local storage
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred while updating profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="client-profile-container">
      <h1>User Profile</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form className="client-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email (cannot be changed)</label>
          <input type="email" name="email" value={userData.email} disabled />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ClientProfile;
