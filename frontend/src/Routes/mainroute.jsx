import React, { lazy } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Pages/login";

import Register from "../Pages/Register";
import PublicRoute from "../Middleware/PublicRoute";
const Home = lazy(() => import("../Pages/home"));

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PublicRoute component={Home} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRoute;