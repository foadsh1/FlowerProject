import React from "react";
import "../assets/css/about.css"; // ✅ Updated CSS file
import aboutImage from "../assets/images/about.jpg"; // ✅ Use a high-quality floral image

const About = () => {
  return (
    <div className="about-page">
      {/* ✅ Hero Section */}
      <div className="about-hero">
        <div className="about-overlay">
          <h1>Discover the Elegance of Flora</h1>
          <p>Where Every Petal Tells a Story</p>
        </div>
      </div>

      {/* ✅ Main Content Section */}
      <div className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Welcome to <strong>Flora</strong>, a floral haven where passion meets
            creativity. We specialize in crafting breathtaking floral arrangements
            for every special occasion.
          </p>
          <p>
            Whether it’s weddings, birthdays, anniversaries, or a simple gesture of
            love, our handpicked flowers bring beauty and joy into every moment.
          </p>
          <p className="about-highlight">
            🌸 Experience the magic of flowers, crafted with love and elegance. 🌸
          </p>
        </div>

        {/* ✅ Image Section */}
        <div className="about-image-container">
          <img src={aboutImage} alt="Beautiful Flowers" className="about-image" />
        </div>
      </div>

      {/* ✅ Mission Section */}
      <div className="about-mission">
        <h2>Our Commitment</h2>
        <p>
          At <strong>Flora</strong>, we believe that flowers speak a universal language of
          love, care, and celebration. That’s why we ensure that every bloom is
          fresh, every arrangement is unique, and every order delivers happiness.
        </p>
      </div>

      {/* ✅ Call to Action */}
      <div className="about-footer">
        <h2>Let Flowers Brighten Your World</h2>
        <p>💐 Visit Flora today and discover the beauty of nature’s finest creations! 💐</p>
      </div>
    </div>
  );
};

export default About;
