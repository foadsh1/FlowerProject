import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/home.css";

// Import images
import heroImage from "../assets/images/hero.jpg";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
import img5 from "../assets/images/img5.png";
import img6 from "../assets/images/img6.png";

const Home = () => {
  const navigate = useNavigate();

  // Flower categories
  const images = [
    { id: 1, src: img1, name: "Rose Collection" },
    { id: 2, src: img2, name: "Tulip Elegance" },
    { id: 3, src: img3, name: "Lily Beauty" },
    { id: 4, src: img4, name: "Orchid Luxury" },
    { id: 5, src: img5, name: "Daisy Freshness" },
    { id: 6, src: img6, name: "Sunflower Joy" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="home-container">
      {/* ✅ Hero Section */}
      <div className="hero">
        <img src={heroImage} alt="Floral Background" className="hero-bg" />
        <div className="hero-overlay">
          <h1>Discover the Beauty of Flowers</h1>
          <p>Elegant floral arrangements for every occasion.</p>
          <button className="cta-btn" onClick={() => navigate("/flower-shops")}>
            Explore Now
          </button>
        </div>
      </div>

      {/* ✅ Categories Slider */}
      <h2 className="section-title">Browse our Bouquets Collection</h2>
      <Slider {...settings} className="slick-slider">
        {images.map((item) => (
          <div key={item.id} className="slick-slide">
            <img src={item.src} alt={item.name} className="slider-image" />
            <h3>{item.name}</h3>
          </div>
        ))}
      </Slider>

      {/* ✅ Featured Products */}
      <h2 className="section-title">Our Flowers</h2>
      <div className="featured-grid">
        {images.map((item) => (
          <div key={item.id} className="featured-card">
            <img src={item.src} alt={item.name} className="featured-image" />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
