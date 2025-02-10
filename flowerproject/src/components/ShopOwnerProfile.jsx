import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/shopOwnerProfile.css"; // ✅ Import the modern pink-themed CSS

const ShopOwnerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get the ID from the URL
  const storedUser = JSON.parse(localStorage.getItem("shopOwner")) || {};
  const shopOwnerId = storedUser.id || null;

  console.log("Stored User:", storedUser);
  console.log("Shop Owner ID:", shopOwnerId);

  const [shopData, setShopData] = useState({
    ownerName: "",
    email: "",
    shopName: "",
    location: "",
    image: "",
    moreInfo: "",
  });

  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!shopOwnerId) {
      console.log("No shop owner ID found, redirecting to sign in.");
      navigate("/shop-owner/signin"); // ✅ Redirect to login if not authenticated
      return;
    }

    const fetchShopData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/shop-owner/${shopOwnerId}`
        );
        const data = await response.json();

        if (response.ok) {
          setShopData(data);
          setProducts(data.products || []);
          if (data.image) setPreview(`http://localhost:5000${data.image}`);
        } else {
          setError(data.error || "Failed to fetch shop data.");
        }
      } catch (err) {
        setError("An error occurred while fetching shop details.");
      }
    };

    fetchShopData();
  }, [shopOwnerId, navigate]);

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const imageForm = new FormData();
    imageForm.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: imageForm,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setShopData((prev) => ({ ...prev, image: data.imageUrl }));
      }
    } catch (err) {
      setError("Failed to upload image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/shop-owner/update/${shopOwnerId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shopData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess("Shop information updated successfully!");
      } else {
        setError(data.error || "Failed to update shop details.");
      }
    } catch (err) {
      setError("An error occurred while updating shop details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/shop-owner/delete/${shopOwnerId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Profile deleted successfully.");
        localStorage.removeItem("shopOwner"); // ✅ Remove session
        navigate("/shop-owner/signin"); // ✅ Redirect to sign-in
      } else {
        alert("Failed to delete profile.");
      }
    } catch (err) {
      console.error("Error deleting profile:", err);
      alert("An error occurred while deleting the profile.");
    }
  };

  return (
    <div className="shop-owner-profile">
      <h1>Shop Owner Profile</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="shop-owner-info">
        <h2>{shopData.shopName || "Your Shop Name"}</h2>
        <p>
          <strong>Owner Name:</strong> {shopData.ownerName || "Not Set"}
        </p>
        <p>
          <strong>Email:</strong> {shopData.email || "Not Set"}
        </p>
        <p>
          <strong>Location:</strong> {shopData.location || "Not Set"}
        </p>
        <p>
          <strong>More Info:</strong>{" "}
          {shopData.moreInfo || "No additional info provided."}
        </p>
        {preview && (
          <img src={preview} alt="Shop Preview" className="shop-owner-image" />
        )}
      </div>

      {/* ✅ Update Shop Details Form */}
      <form className="shop-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={shopData.ownerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email (Read-Only)</label>
          <input type="email" name="email" value={shopData.email} readOnly />
        </div>
        <div className="form-group">
          <label>Shop Name</label>
          <input
            type="text"
            name="shopName"
            value={shopData.shopName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={shopData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>More About Shop</label>
          <textarea
            name="moreInfo"
            value={shopData.moreInfo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Shop Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Save Changes"}
        </button>
      </form>

      <button
        className="btn manage-products-btn"
        onClick={() => navigate(`/shop-owner/products`)}
      >
        Manage My Products
      </button>

      <button className="btn delete-profile-btn" onClick={handleDeleteProfile}>
        Delete My Profile
      </button>

      <h2>My Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ShopOwnerProfile;
