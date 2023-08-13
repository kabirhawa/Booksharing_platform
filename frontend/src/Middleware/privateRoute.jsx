import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setToken } from "../store/slices/user";

export const PrivateRoute = (Component) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user).token;

  const isTokenValid = () => {
    var authTokenTimestamp = Number(
      sessionStorage.getItem("authTokenTimestamp")
    );
    let auth;
    if (userState) {
      auth = userState;
    } else {
      auth = sessionStorage.getItem("authToken");
      dispatch(setToken(auth));
    }

    if (!auth) {
      return false; // Token not found
    }

    const now = new Date().getTime();
    const timeElapsed = now - authTokenTimestamp;
    const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

    return timeElapsed < twentyFourHoursInMillis;
  };

  const PrivateComponent = () => {
    return isTokenValid() ? <Component /> : <Navigate to={"/login"} />;
  };

  return PrivateComponent;
};
