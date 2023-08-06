import React from "react";
import { Navigate, Redirect } from "react-router-dom";

export const privateRoute = (Component) => {
  const isTokenValid = () => {
    const authTokenTimestamp = parseInt(
      sessionStorage.getItem("authTokenTimestamp"),
      10
    );
    if (!authTokenTimestamp) {
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
