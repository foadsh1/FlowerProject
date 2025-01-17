import React, { useRef, useState } from "react";
import "../assets/css/sliderStyles.css";
import "../assets/css/carouselStyles.css";

// Import images from src
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
import img5 from "../assets/images/img5.png";
import img6 from "../assets/images/img6.png";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of imported images
  const images = [img1, img2, img3, img4, img5, img6];

  const rotateCarousel = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  return (
    <div className="slider">
      <div className="title">Flower Carousel</div>
      <div
        className="images"
        ref={carouselRef}
        style={{ "--rotate": `${currentIndex * -60}deg` }}
      >
        {images.map((src, index) => (
          <div className="item" style={{ "--i": index }} key={index}>
            <img src={src} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <div className="content">
        <div className="item active">
          <h1>Welcome</h1>
          <p className="des">Explore our amazing flower collection.</p>
          <button>Discover More</button>
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
