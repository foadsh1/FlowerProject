import React from "react";

const ProductList = () => {
  const products = [
    { id: 1, name: "Rose Bouquet", price: "$29.99" },
    { id: 2, name: "Tulip Arrangement", price: "$24.99" },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
