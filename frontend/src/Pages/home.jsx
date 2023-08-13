import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const userState = useSelector((state) => state.user).token;
  console.log(userState);
  return (
    <Box>
      <Typography variant="h3">Home</Typography>
    </Box>
  );
};

export default Home;
