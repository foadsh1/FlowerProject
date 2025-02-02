import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/ContactForm";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

const RoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit" element={<EditProduct />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default RoutesFile;
