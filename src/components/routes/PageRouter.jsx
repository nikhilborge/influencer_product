import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Products from "../../pages/product/Products";
import ProductDetails from "../../pages/product/ProductDetails";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";

const PageRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route index path="/signup" element={<Signup />} />

          <Route index path="/" element={<Home />} />
          <Route index path="/about" element={<About />} />
          <Route index path="/product" element={<Products />} />
          <Route index path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRouter;
