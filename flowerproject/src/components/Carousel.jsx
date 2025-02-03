import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/sliderStyles.css";
import "../assets/css/carouselStyles.css";

// Import images from assets
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
import img5 from "../assets/images/img5.png";
import img6 from "../assets/images/img6.png";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  //  Array of images with details
  const images = [
    { id: 1, src: img1, name: "Rose Bouquet", price: "$25" },
    { id: 2, src: img2, name: "Tulip Arrangement", price: "$30" },
    { id: 3, src: img3, name: "Lily Basket", price: "$20" },
    { id: 4, src: img4, name: "Orchid Set", price: "$35" },
    { id: 5, src: img5, name: "Daisy Bundle", price: "$15" },
    { id: 6, src: img6, name: "Sunflower Pack", price: "$40" },
  ];

  // ✅ Rotate the carousel
  const rotateCarousel = (direction) => {
    setCurrentIndex((prevIndex) =>
      direction === "next"
        ? (prevIndex + 1) % images.length
        : (prevIndex - 1 + images.length) % images.length
    );
  };

  //  Navigate to products with selected product details
  const goToProducts = (selectedProduct = null) => {
    navigate("/products", { state: { selectedProduct } });
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">🌸 Flower Carousel 🌸</h2>

      {/*  Carousel Images */}
      <div className="carousel-wrapper">
        <button
          className="carousel-btn prev"
          onClick={() => rotateCarousel("prev")}
        >
          &lt;
        </button>

        <div className="carousel-images">
          {images.map((product, index) => (
            <div
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
              key={product.id}
              onClick={() => goToProducts(product)}
            >
              <img
                src={product.src}
                alt={product.name}
                className="carousel-img"
              />
              <div className="carousel-caption">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-btn next"
          onClick={() => rotateCarousel("next")}
        >
          &gt;
        </button>
      </div>

      {/*  Welcome Message */}
      <div className="carousel-content">
        <h1>Welcome to Flora</h1>
        <p>
          Explore our amazing flower collection and find the perfect bouquet.
        </p>
        <button
          className="carousel-discover-btn"
          onClick={() => goToProducts()}
        >
          Discover More
        </button>
      </div>
    </div>
  );
};

export default Carousel;
