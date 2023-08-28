import React, { lazy } from "react";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Pages/login";
import Register from "../Pages/Register";
import PublicRoute from "../Middleware/PublicRoute";
import Footer from "../components/partials/Footer";
import Dashboard from "../Admin/Dashboard";
import User1 from "../Admin/component/User";
import CreateUser from "../Admin/component/CreateUser";

import Sidebar2 from "../Admin/SideBar2";
import Navbar2 from "../components/partials/Navbar2";

const Home = lazy(() => import("../Pages/home"));
const Search = lazy(() => import("../Pages/Search"));

const MainRoute = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/admin/User" ||
      location.pathname === "/admin/User/create" ||
      location.pathname === "/admin" ? (
        <></>
      ) : (
        <Navbar2 />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PublicRoute component={Home} />} />
        <Route path="/search" element={<PublicRoute component={Search} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Sidebar2 Component={Dashboard} />} />
        <Route
          path="/admin/User"
          element={<Sidebar2 Component={User1} />}
        />
        <Route
          path="/admin/User/create"
          element={<Sidebar2 Component={CreateUser} />}
        />
      </Routes>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/admin/User" ||
      location.pathname === "/admin/User/create" ||
      location.pathname === "/admin" ? (
        <></>
      ) : (
        <Footer />
      )}
    </>
  );
};

export default MainRoute;
