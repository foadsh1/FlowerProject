import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/shopOwnerProducts.css"; // ✅ Import CSS

const ShopOwnerProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get Shop Owner ID from URL (if needed)

  // ✅ Ensure correct storage key is used
  const storedUser = JSON.parse(localStorage.getItem("shopOwner"));
  const shopOwnerId = storedUser ? storedUser.id : id;

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shopOwnerId) {
      navigate("/shop-owner/signin");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products/shop/${shopOwnerId}`
        );
        const data = await response.json();

        console.log("Fetched Products:", data); // ✅ Debugging Log

        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.error || "Failed to fetch products.");
        }
      } catch (err) {
        setError("An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, [shopOwnerId, navigate]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/products/delete/${productId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } else {
        setError("Failed to delete product.");
      }
    } catch (err) {
      setError("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="shop-products-container">
      <h1>My Products</h1>
      {error && <p className="error">{error}</p>}

      <button
        className="btn add-product-btn"
        onClick={() => navigate("/shop-owner/add-product")}
      >
        Add New Product
      </button>

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
              <p className="product-price">${product.price}</p>
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
                onClick={() => handleDelete(product.id)}
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

export default ShopOwnerProducts;
