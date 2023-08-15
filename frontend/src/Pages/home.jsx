import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Crousal from "../components/home/Crousal";
import Document from "../components/home/Document";

const Home = () => {
  const userState = useSelector((state) => state.user).token;
  console.log(userState);

  const cards = [
    {
      title: "Book Title 1",
      description: "Description for Book 1",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    },
    {
      title: "Book Title 2",
      description: "Description for Book 2",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    },
    {
      title: "Book Title 3",
      description: "Description for Book 2",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    },
    {
      title: "Book Title 4",
      description: "Description for Book 2",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    },
    {
      title: "Book Title 4",
      description: "Description for Book 2",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    },
    {
      title: "Book Title 4",
      description: "Description for Book 2",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    },
    {
      title: "Book Title 4",
      description: "Description for Book 2",
      imageUrl: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    },
    // Add more cards as needed
  ];
  return (
    <Box>
      <Document />

      <Crousal cards={cards} title={"Most Viewed"} />
      <br />
      <Crousal cards={cards} title={"Recently Added"} />
      <br />
      <Crousal cards={cards} title={"Knowledge"} />
      <br />
      <Crousal cards={cards} title={"Fantacy"} />
      <br />
      <Crousal cards={cards} title={"Horror"} />
      <br />
    </Box>
  );
};

export default Home;
