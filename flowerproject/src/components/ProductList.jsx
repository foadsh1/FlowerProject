import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import "../assets/css/productListStyles.css";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, name: "Rose Bouquet", price: "$25", image: img1 },
    { id: 2, name: "Tulip Arrangement", price: "$30", image: img2 },
    { id: 3, name: "Lily Basket", price: "$20", image: img3 },
  ]);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const goToAddProduct = () => {
    navigate("/products/add", { state: { products, addProduct } });
  };

  const goToEditProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      navigate(`/products/edit/${productId}`, {
        state: { product, updateProduct },
      });
    }
  };

  return (
    <div className="product-list">
      <h1>Product Management</h1>
      <button onClick={goToAddProduct} className="btn">
        Add New Product
      </button>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => goToEditProduct(product.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
