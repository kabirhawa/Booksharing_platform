import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setToken, setUser } from "../store/slices/user";
import axios from "axios";
import { getUser } from "../Service/user.service";

export const PrivateRoute = ({ component: Component }) => {
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

    const now = new Date().getTime();
    const timeElapsed = now - authTokenTimestamp;
    const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

    return timeElapsed < twentyFourHoursInMillis;
  };

  return isTokenValid() ? <Component /> : <Navigate to={"/login"} />;
};
