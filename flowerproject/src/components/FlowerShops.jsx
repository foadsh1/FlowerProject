import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/globalstyles.css";

const FlowerShops = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch("http://localhost:5000/shop-owner/all");
        const data = await response.json();

        if (response.ok) {
          setShops(data);
        } else {
          setError(data.error || "Failed to fetch flower shops.");
        }
      } catch (err) {
        setError("An error occurred while fetching shops.");
      }
    };

    fetchShops();
  }, []);

  const goToShopDetails = (shopId) => {
    navigate(`/flower-shops/${shopId}`);
  };

  return (
    <div className="shops-container">
      <h1 className="shops-title">Our Flower Shops</h1>
      {error && <p className="error">{error}</p>}

      <div className="shops-grid">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <div
              key={shop.id}
              className="shop-card"
              onClick={() => goToShopDetails(shop.id)}
            >
              <img
                src={`http://localhost:5000${shop.image}`}
                alt={shop.shop_name}
                className="shop-image"
              />
              <h2 className="shop-name">{shop.shop_name}</h2>
              <p className="shop-location">📍 {shop.location}</p>
              <p className="shop-info">{shop.more_info.substring(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p className="no-shops">No flower shops available.</p>
        )}
      </div>
    </div>
  );
};

export default FlowerShops;
