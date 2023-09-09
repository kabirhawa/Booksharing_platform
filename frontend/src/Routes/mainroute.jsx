import React, { Suspense, lazy } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Pages/login";
import Register from "../Pages/Register";

import PublicRoute from "../Middleware/PublicRoute";

import Dashboard from "../Admin/Dashboard";
import User1 from "../Admin/component/User";
import Books from "../Admin/component/Books";
import CreateBooks from "../Admin/component/createBook";

import CreateUser from "../Admin/component/CreateUser";

import { PrivateRoute } from "../Middleware/privateRoute";

import { LinearProgress } from "@mui/material";
import { AdminRoute } from "../Middleware/AdminRoute";
const Home = lazy(() => import("../Pages/home"));
const Profile = lazy(() => import("../Pages/profile"));
const Search = lazy(() => import("../Pages/Search"));
const Wishlist = lazy(() => import("../Pages/wishlist"));
// const PageNotFound = lazy(() => import("../Pages/pagenotfound"));
const MyRequest = lazy(() => import("../Pages/myRequest"));
const Book = lazy(() => import("../Pages/productPage"));
const MyBooks = lazy(() => import("../Pages/myBooks/myBooks"));
const AddMyBooks = lazy(() => import("../Pages/myBooks/addBook"));

const MainRoute = () => {
  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PublicRoute component={Home} />} />
          <Route path="/search" element={<PublicRoute component={Search} />} />
          <Route path="/book/view" element={<PublicRoute component={Book} />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path="/mybooks"
            element={<PrivateRoute component={MyBooks} />}
          />
          <Route
            path="/myRequest"
            element={<PrivateRoute component={MyRequest} />}
          />
          <Route
            path="/mybooks/add"
            element={<PrivateRoute component={AddMyBooks} />}
          />
          <Route
            path="/mybooks/edit"
            element={<PrivateRoute component={AddMyBooks} />}
          />
          <Route
            path="/wishlist"
            element={<PrivateRoute component={Wishlist} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminRoute component={Dashboard} />} />

          <Route
            path="/admin/User"
            element={<AdminRoute component={User1} />}
          />
          <Route
            path="/admin/User/create"
            element={<AdminRoute component={CreateUser} />}
          />
          <Route
            path="/admin/books"
            element={<AdminRoute component={Books} />}
          />
          <Route
            path="/admin/books/create"
            element={<AdminRoute component={CreateBooks} />}
          />

          {/* Route for Page Not Found */}
          {/* <Route path="/*" element={PageNotFound} /> */}
        </Routes>
      </Suspense>
    </>
  );
};

export default MainRoute;
