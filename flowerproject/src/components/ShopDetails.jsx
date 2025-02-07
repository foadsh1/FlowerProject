import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/shopDetails.css"; // ✅ Import CSS

const ShopDetails = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/shop-owner/${id}`);
        const data = await response.json();

        if (response.ok) {
          setShop(data);
        } else {
          setError(data.error || "Shop details not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching shop details.");
      }
    };

    fetchShopDetails();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!shop) return <p className="loading">Loading shop details...</p>;

  return (
    <div className="shop-details-container">
      <img src={`http://localhost:5000${shop.image}`} alt={shop.shop_name} className="shop-details-image" />
      <h1 className="shop-details-title">{shop.shop_name}</h1>
      <p className="shop-details-location">📍 Location: {shop.location}</p>
      <p className="shop-details-info">{shop.more_info}</p>

      {/* ✅ Show Products */}
      <h2 className="shop-products-title">Available Products</h2>
      <div className="shop-products-grid">
        {shop.products.length > 0 ? (
          shop.products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          ))
        ) : (
          <p className="no-products">No products available from this shop.</p>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;
