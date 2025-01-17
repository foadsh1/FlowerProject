import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/ContactForm";
import Login from "../components/Login";

const RoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesFile;
