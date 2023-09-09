import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../store/slices/user";
import axios from "axios";
import { getUser } from "../Service/user.service";

import Sidebar2 from "../Admin/SideBar2";
import { showSnakbar } from "../store/slices/snakbar";
import { NotFound } from "../components/partials/NotFound";

export const AdminRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user).token;
  const user = useSelector((state) => state.user).user;

  const handleAsyncOperations = useCallback(async () => {
    console.log("Async operations started");

    try {
      if (!userState && !user && sessionStorage.getItem("authToken")) {
        const auth = sessionStorage.getItem("authToken");
        dispatch(setToken(auth));
        axios.defaults.headers.common["Authorization"] = "Bearer " + auth;
        const response = await getUser();
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, userState, user]);

  const isTokenValid = () => {
    var authTokenTimestamp = sessionStorage.getItem("authTokenTimestamp");

    if (!userState || !user) {
      handleAsyncOperations();
    }

    if (!userState) {
      return false; // Token not found
    }

    if (user && user.role_Id === 1) {
      dispatch(
        showSnakbar({
          message: "invalid route",
          open: true,
          type: "error",
        })
      );

      navigate("/");
      return false;
    }

    const now = new Date().getTime();
    const timeElapsed = now - authTokenTimestamp;
    const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

    return timeElapsed < twentyFourHoursInMillis;
  };

  return isTokenValid() && user && user?.role_Id !== 1 ? (
    <Sidebar2 Component={Component} />
  ) : user?.role_Id === 1 ? (
    <Navigate to={"/"} replace />
  ) : (
    <NotFound />
  );
};
