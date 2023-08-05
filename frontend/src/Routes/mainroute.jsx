import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Pages/login";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MainRoute;
