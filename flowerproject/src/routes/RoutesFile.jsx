import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../frontend/components/Home";
import About from "../frontend/components/About";
import Contact from "../frontend/components/ContactForm";
import Login from "../frontend/components/Login";
import Signup from "../frontend/components/signup";
import ShopOwnerSignin from "../frontend/components/ShopOwnerSignin";
import ShopOwnerSignup from "../frontend/components/ShopOwnerSignup";
import AddProduct from "../frontend/components/AddProduct";
import EditProduct from "../frontend/components/EditProduct";
import FlowerShops from "../frontend/components/FlowerShops";
import ShopOwnerProfile from "../frontend/components/ShopOwnerProfile";
import ShopDetails from "../frontend/components/ShopDetails";
import ShopOwnerProducts from "../frontend/components/ShopOwnerProducts";
import ClientProfile from "../frontend/components/ClientProfile";


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
      <Route path="/user/profile/:id" element={<ClientProfile />} />
      <Route path="/flower-shops/:id" element={<ShopDetails />} />
      <Route path="/shop-owner/products" element={<ShopOwnerProducts />} />
      <Route path="/shop-owner/add-product" element={<AddProduct />} />
      <Route path="/shop-owner/edit-product/:id" element={<EditProduct />} />
      <Route path="/shop-owner/signin" element={<ShopOwnerSignin />} />
      <Route path="/shop-owner/signup" element={<ShopOwnerSignup />} />
      <Route path="/flower-shops" element={<FlowerShops />} />
    </Routes>
  );
};

export default RoutesFile;
