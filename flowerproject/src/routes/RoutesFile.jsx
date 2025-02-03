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
      {/*  Default route redirects to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/*  Main pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/*  Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/*  Product Management */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route
        path="/products/delete/:id"
        element={<Navigate to="/products" />}
      />
    </Routes>
  );
};

export default RoutesFile;
