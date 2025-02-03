import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/productListStyles.css";


const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products") //  Fetch from backend
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const goToAddProduct = () => {
    navigate("/products/add");
  };

  const goToEditProduct = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  return (
    <div className="product-list">
      <h1>Product Management</h1>
      <button onClick={goToAddProduct}>Add New Product</button>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }} //  Display image
            />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => goToEditProduct(product.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
