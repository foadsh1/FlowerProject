import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
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
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Array of images with details
  const images = [
    { id: 1, src: img1, name: "Rose Bouquet", price: "$25" },
    { id: 2, src: img2, name: "Tulip Arrangement", price: "$30" },
    { id: 3, src: img3, name: "Lily Basket", price: "$20" },
    { id: 4, src: img4, name: "Orchid Set", price: "$35" },
    { id: 5, src: img5, name: "Daisy Bundle", price: "$15" },
    { id: 6, src: img6, name: "Sunflower Pack", price: "$40" },
  ];

  const rotateCarousel = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const goToProducts = (selectedProduct = null) => {
    navigate("/products", { state: { selectedProduct } }); // Navigate to product list with optional product details
  };

  return (
    <div className="slider">
      <div className="title">Flower Carousel</div>
      <div
        className="images"
        ref={carouselRef}
        style={{ "--rotate": `${currentIndex * -60}deg` }}
      >
        {images.map((product, index) => (
          <div
            className="item"
            style={{ "--i": index }}
            key={product.id}
            onClick={() => goToProducts(product)} // Navigate with selected product details
          >
            <img src={product.src} alt={product.name} />
          </div>
        ))}
      </div>
      <div className="content">
        <div className="item active">
          <h1>Welcome</h1>
          <p className="des">Explore our amazing flower collection.</p>
          <button onClick={() => goToProducts()}>Discover More</button>
        </div>
      </div>
      <button id="prev" onClick={() => rotateCarousel("prev")}>
        &lt;
      </button>
      <button id="next" onClick={() => rotateCarousel("next")}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
