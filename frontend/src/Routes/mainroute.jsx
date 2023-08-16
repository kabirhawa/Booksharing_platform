import React, { lazy } from "react";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Pages/login";
import Navbar from "../components/partials/Navbar";
import Register from "../Pages/Register";
import Admin from "../Admin/Admin";
import PublicRoute from "../Middleware/PublicRoute";
import Footer from "../components/partials/Footer";
import Dashboard from "../Admin/Dashboard";
import AdminUser from "../Admin/component/User";
const Home = lazy(() => import("../Pages/home"));

const MainRoute = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      {location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/admin" ? (
        <></>
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PublicRoute component={Home} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/User" element={<AdminUser />} />



      </Routes>
      {location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/admin" ? (
        <></>
      ) : (
        <Footer />
      )}
      
    </>
  );
};

export default MainRoute;
