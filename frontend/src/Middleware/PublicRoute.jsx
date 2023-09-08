import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../store/slices/user";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../Service/user.service";
import Navbar2 from "../components/partials/Navbar2";
import Footer from "../components/partials/Footer";

const PublicRoute = ({ component: Component }) => {
  // console.log("public route called");
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
    console.log("called");
    var authTokenTimestamp = sessionStorage.getItem("authTokenTimestamp");

    if (!userState || !user) {
      handleAsyncOperations();
    }

    if (!userState) {
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

  return isTokenValid() ? (
    <>
      <Navbar2 />
      <Component />
      <Footer />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PublicRoute;
