import React from "react";
import "../assets/css/globalstyles.css"; 

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p className="about-text">
        Welcome to <strong>Flora</strong>. We specialize in providing beautiful
        and fresh floral arrangements for all occasions. Whether it's weddings,
        anniversaries, birthdays, or just to brighten someone's day, we have the
        perfect bouquet for you.
      </p>
      <p className="about-text">
        Our team of expert florists carefully handpick each flower to ensure the
        highest quality and freshness. We take pride in delivering love and
        emotions through our elegant floral designs.
      </p>
      <div className="about-image-container">
        <img
          src="https://giftr.sg/cdn/shop/products/May_muGzBrKcT_1024x1024.jpg?v=1683515049"
          alt="Beautiful Flowers"
          className="about-image"
        />
      </div>
      <p className="about-contact">
        💐 Visit us today and experience the beauty of flowers! 💐
      </p>
    </div>
  );
};

export default About;
