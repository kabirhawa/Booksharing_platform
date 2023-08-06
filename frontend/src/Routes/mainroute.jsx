import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Pages/login";
import Home from "../Pages/home";
import Register from "../Pages/Register";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRoute;
