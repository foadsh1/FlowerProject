import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/shopOwnerProducts.css"; // Reuse styles

const ShopOwnerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const shopOwnerId = storedUser ? storedUser.id : null;

  const [shopData, setShopData] = useState({
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
      navigate("/shop-owner/signin");
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

  return (
    <div className="shop-owner-profile">
      <h1>Shop Owner Profile</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="shop-owner-info">
        <h2>{shopData.shopName || "Your Shop Name"}</h2>
        <p>
          <strong>Location:</strong> {shopData.location || "Not set"}
        </p>
        <p>
          <strong>More Info:</strong>{" "}
          {shopData.moreInfo || "No additional info provided."}
        </p>
        {preview && (
          <img src={preview} alt="Shop Preview" className="shop-owner-image" />
        )}
      </div>

      <form className="shop-profile-form" onSubmit={handleSubmit}>
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

      {/* Show Products */}
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
              <button
                className="btn edit-btn"
                onClick={() =>
                  navigate(`/shop-owner/edit-product/${product.id}`)
                }
              >
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => alert("Delete function not implemented")}
              >
                Delete
              </button>
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
