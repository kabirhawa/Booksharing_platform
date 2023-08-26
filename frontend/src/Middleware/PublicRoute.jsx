import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../store/slices/user";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../Service/user.service";

const PublicRoute = ({ component: Component }) => {
  // console.log("public route called");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user).token;

  const isTokenValid = () => {
    console.log("called");
    var authTokenTimestamp = sessionStorage.getItem("authTokenTimestamp");

    let auth = null;
    if (userState) {
      auth = userState;
    } else {
      if (sessionStorage.getItem("authToken")) {
        auth = sessionStorage.getItem("authToken");
        dispatch(setToken(auth));
        axios.defaults.headers.common["Authorization"] = "Bearer " + auth;
        getUser()
          .then((data) => {
            dispatch(setUser(data.data.data));
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }

    if (!auth) {
      console.log("true");
      return true; // Token not found
    } else {
      const now = new Date().getTime();
      if (authTokenTimestamp) {
        const timeElapsed = now - authTokenTimestamp;
        const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
        console.log("here true");
        return timeElapsed < twentyFourHoursInMillis;
      } else {
        return false;
      }
    }
  };

  return isTokenValid() ? <Component /> : <Navigate to={"/login"} />;
};

export default PublicRoute;
