import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Crousal from "../components/home/Crousal";

const Home = () => {
  const userState = useSelector((state) => state.user).token;
  console.log(userState);
  const cards = [
    {
      title: "Book Title 1",
      description: "Description for Book 1",
      imageUrl: "/path/to/book1-image.jpg",
    },
    {
      title: "Book Title 2",
      description: "Description for Book 2",
      imageUrl: "/path/to/book2-image.jpg",
    },
    {
      title: "Book Title 2",
      description: "Description for Book 2",
      imageUrl: "/path/to/book2-image.jpg",
    },
    {
      title: "Book Title 2",
      description: "Description for Book 2",
      imageUrl: "/path/to/book2-image.jpg",
    },  
    // Add more cards as needed
  ];
  return (
    <Box>
      <Crousal cards={cards} />
    </Box>
  );
};

export default Home;
