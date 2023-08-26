import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Crousal from "../components/home/Crousal";
import Document from "../components/home/Document";
import image1 from "../images/1159.jpg";
import image2 from "../images/7492664.jpg";
import image3 from "../images/19021605.jpg";
import image4 from "../images/OJK93M0.jpg";
import image5 from "../images/ORJ9ZL0.jpg";

const Home = () => {
  const userState = useSelector((state) => state.user).token;
  console.log(userState);

  const cards = [
    {
      title: "Book Title 1",
      description: "Description for Book 1",
      imageUrl: image1,
    },
    {
      title: "Book Title 2",
      description: "Description for Book 2",
      imageUrl: image2,
    },
    {
      title: "Book Title 3",
      description: "Description for Book 2",
      imageUrl: image3,
    },
    {
      title: "Book Title 4",
      description: "Description for Book 2",
      imageUrl: image4,
    },
    {
      title: "Book Title 4",
      description: "Description for Book 2",
      imageUrl: image5,
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
