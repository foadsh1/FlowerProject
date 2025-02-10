import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/footer.css"; // ✅ Import Footer CSS
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa"; // ✅ Import Social Media Icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 🌸 Logo & Description */}
        <div className="footer-logo">
          <h2>Flora</h2>
          <p>Bringing Nature's Beauty to Your Doorstep.</p>
        </div>

        {/* 🌸 Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* 🌸 Authentication Links */}
        <div className="footer-auth">
          <h3>Account</h3>
          <ul>
            <li>
              <Link to="/client/signin">Client Login</Link>
            </li>{" "}
            {/* ✅ Client Login */}
            <li>
              <Link to="/shop-owner/signin">Shop Owner Login</Link>
            </li>
          </ul>
        </div>

        {/* 🌸 Social Media Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-icon" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="social-icon" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="social-icon" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* 🌸 Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Flora A Project By Foad & Rabea All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
