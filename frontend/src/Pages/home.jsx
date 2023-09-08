import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Crousal from "../components/home/Crousal";
import Document from "../components/home/Document";
import image1 from "../images/1159.jpg";
import image2 from "../images/7492664.jpg";
import image3 from "../images/19021605.jpg";
import image4 from "../images/OJK93M0.jpg";
import image5 from "../images/ORJ9ZL0.jpg";
import { getBooks } from "../Service/books.service";
import { setAllBooks } from "../store/slices/book";

const Home = () => {
  const userState = useSelector((state) => state.user).token;
  const user = useSelector((state) => state.user).user;
  console.log(userState);
  const dispatch = useDispatch();
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

  useEffect(() => {
    getBooks()
      .then((data) => {
        console.log(data);
        dispatch(setAllBooks(data.data.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Books = useSelector((state) => state.books).AllBooks;
  return (
    <Box>
      <Document />

      <Crousal cards={Books?Books:[]} title={"Most Viewed"} />
      <br />
      <Crousal cards={Books?Books:[]} title={"Recently Added"} />
      <br />
      <Crousal cards={Books?Books:[]} title={"Knowledge"} />
      <br />
      <Crousal cards={Books?Books:[]} title={"Fantacy"} />
      <br />
      <Crousal cards={Books?Books:[]} title={"Horror"} />
      <br />
    </Box>
  );
};

export default Home;
