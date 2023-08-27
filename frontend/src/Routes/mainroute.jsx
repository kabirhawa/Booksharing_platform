import React, { Suspense, lazy } from "react";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Pages/login";

import Register from "../Pages/Register";

import PublicRoute from "../Middleware/PublicRoute";
import Footer from "../components/partials/Footer";
import Dashboard from "../Admin/Dashboard";
import AdminUser from "../Admin/component/User";
import Navbar2 from "../components/partials/Navbar2";

import Sidebar2 from "../Admin/SideBar2";
import { PrivateRoute } from "../Middleware/privateRoute";
import { LinearProgress } from "@mui/material";
const Home = lazy(() => import("../Pages/home"));
const Profile = lazy(() => import("../Pages/profile"));
const Search = lazy(() => import("../Pages/Search"));
const Wishlist = lazy(() => import("../Pages/wishlist"));
const PageNotFound = lazy(() => import("../Pages/pagenotfound"));
const MyBooks = lazy(() => import("../Pages/myBooks/myBooks"));
const AddMyBooks = lazy(() => import("../Pages/myBooks/addBook"));

const MainRoute = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/admin/dashboard" ||
      location.pathname === "/admin" ? (
        <></>
      ) : (
        <Navbar2 />
      )}
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PublicRoute component={Home} />} />
          <Route path="/search" element={<PublicRoute component={Search} />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path="/mybooks"
            element={<PrivateRoute component={MyBooks} />}
          />
          <Route
            path="/mybooks/add"
            element={<PrivateRoute component={AddMyBooks} />}
          />
          <Route
            path="/wishlist"
            element={<PrivateRoute component={Wishlist} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Sidebar2 Component={Dashboard} />} />
          <Route
            path="/admin/User"
            element={<Sidebar2 component={AdminUser} />}
          />

          {/* Route for Page Not Found */}
          {/* <Route path="/*" element={PageNotFound} /> */}
        </Routes>
      </Suspense>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/admin/dashboard" ||
      location.pathname === "/admin" ? (
        <></>
      ) : (
        <Footer />
      )}
    </>
  );
};

export default MainRoute;
