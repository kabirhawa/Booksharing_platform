import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/slices/user";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component }) => {
  // console.log("public route called");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user).token;

  const isTokenValid = () => {
    console.log("called");
    var authTokenTimestamp = Number(
      sessionStorage.getItem("authTokenTimestamp")
    );
    let auth = null;
    if (userState) {
      auth = userState;
    } else {
      if (sessionStorage.getItem("authToken")) {
        auth = sessionStorage.getItem("authToken");
        dispatch(setToken(auth));
      }
    }

    if (!auth) {
      console.log("true");
      return true; // Token not found
    } else {
      console.log("else condition");
      const now = new Date().getTime();
      if (authTokenTimestamp) {
        const timeElapsed = now - authTokenTimestamp;
        const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

        return timeElapsed < twentyFourHoursInMillis;
      } else {
        return false;
      }
    }
  };

  return isTokenValid() ? <Component /> : <Navigate to={"/login"} />;
};

export default PublicRoute;
