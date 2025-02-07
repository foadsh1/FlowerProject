import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const clientUser = JSON.parse(localStorage.getItem("user"));
  const shopOwnerUser = JSON.parse(localStorage.getItem("shopOwner"));

  const handleLogout = (userType) => {
    if (userType === "client") {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      localStorage.removeItem("shopOwner");
      navigate("/shop-owner/signin");
    }
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/home">My Flower Shop</Link>
      </div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/flower-shops">Shops</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {/* Client Section */}
        {clientUser ? (
          <>
            <Link to="/user/profile">Client Profile</Link>
            <button
              className="logout-btn"
              onClick={() => handleLogout("client")}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="dropdown">
            <button className="dropbtn">Client</button>
            <div className="dropdown-content">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        )}

        {/* Shop Owner Section */}
        {shopOwnerUser ? (
          <>
            <Link to="/shop-owner/profile">Shop Owner Profile</Link>
            <button
              className="logout-btn"
              onClick={() => handleLogout("shopOwner")}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="dropdown">
            <button className="dropbtn">Shop Owner</button>
            <div className="dropdown-content">
              <Link to="/shop-owner/signin">Login</Link>
              <Link to="/shop-owner/signup">Register</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
