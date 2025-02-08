import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import logo from "../assets/images/logo.jpg"; // ✅ Import Logo

const Navbar = () => {
  const navigate = useNavigate();
  const clientUser = JSON.parse(localStorage.getItem("user"));
  const shopOwnerUser = JSON.parse(localStorage.getItem("shopOwner"));

  // ✅ Ensure only one type of user is stored in localStorage at a time
  useEffect(() => {
    if (clientUser && shopOwnerUser) {
      localStorage.removeItem("user"); // Remove client if shop owner logs in
    }
  }, [clientUser, shopOwnerUser]);

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
      {/* ✅ Logo */}
      <div className="logo">
        <Link to="/home">
          <img src={logo} alt="Flora Logo" className="logo-img" />
        </Link>
      </div>

      {/* ✅ Navigation Links */}
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/flower-shops">Shops</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {/* ✅ Show only Shop Owner Profile when logged in as a shop owner */}
        {shopOwnerUser ? (
          <>
            <Link to={`/shop-owner/profile/${shopOwnerUser.id}`}>Shop Owner Profile</Link>
            <button className="logout-btn" onClick={() => handleLogout("shopOwner")}>
              Logout
            </button>
          </>
        ) : clientUser ? (
          <>
            <Link to={`/user/profile/${clientUser.id}`}>Client Profile</Link>
            <button className="logout-btn" onClick={() => handleLogout("client")}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* ✅ Show login/signup options if no user is logged in */}
            <div className="dropdown">
              <button className="dropbtn">Client</button>
              <div className="dropdown-content">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn">Shop Owner</button>
              <div className="dropdown-content">
                <Link to="/shop-owner/signin">Login</Link>
                <Link to="/shop-owner/signup">Register</Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
