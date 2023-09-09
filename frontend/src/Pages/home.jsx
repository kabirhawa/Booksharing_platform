import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Crousal from "../components/home/Crousal";
import Document from "../components/home/Document";

import { getBooks } from "../Service/books.service";
import { setAllBooks } from "../store/slices/book";

const Home = () => {
  const userState = useSelector((state) => state.user).token;
  const user = useSelector((state) => state.user).user;
  console.log(userState);
  const dispatch = useDispatch();

  useEffect(() => {
    getBooks()
      .then((data) => {
        console.log(data);
        dispatch(setAllBooks(data.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Books = useSelector((state) => state.books).AllBooks;
  return (
    <Box>
      <Document />

      <Crousal cards={Books ? Books : []} title={"Most Viewed"} />
      <br />
      <Crousal cards={Books ? Books : []} title={"Recently Added"} />
      <br />
      <Crousal cards={Books ? Books : []} title={"Knowledge"} />
      <br />
      <Crousal cards={Books ? Books : []} title={"Fantacy"} />
      <br />
      <Crousal cards={Books ? Books : []} title={"Horror"} />
      <br />
    </Box>
  );
};

export default Home;
