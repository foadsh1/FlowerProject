import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="logo">Rabia & Foad Design</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">Info</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">LogIn</Link>
      </nav>
    </header>
  );
};

export default Navbar;
