import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/ContactForm";
import Login from "../components/Login";
import Signup from "../components/signup";
import ShopOwnerSignin from "../components/ShopOwnerSignin";
import ShopOwnerSignup from "../components/ShopOwnerSignup";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import FlowerShops from "../components/FlowerShops";
import ShopOwnerProfile from "../components/ShopOwnerProfile";
import ShopDetails from "../components/ShopDetails";
import ShopOwnerProducts from "../components/ShopOwnerProducts";
import ClientProfile from "../components/ClientProfile";


const RoutesFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/shop-owner/profile/:id" element={<ShopOwnerProfile />} />
      <Route path="/user/profile" element={<ClientProfile />} />;
      <Route path="/flower-shops/:id" element={<ShopDetails />} />
      <Route path="/shop-owner/products" element={<ShopOwnerProducts />} />
      <Route path="/shop-owner/add-product" element={<AddProduct />} />
      <Route path="/shop-owner/edit-product/:id" element={<EditProduct />} />;
      <Route path="/shop-owner/signin" element={<ShopOwnerSignin />} />
      <Route path="/shop-owner/signup" element={<ShopOwnerSignup />} />
      <Route path="/flower-shops" element={<FlowerShops />} />
    </Routes>
  );
};

export default RoutesFile;
