import React from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../components/Search/Searchcard";
import { Box } from "@mui/material";

const Search = () => {
  const location = useLocation();
  console.log(location.state.value);
  return (
    <Box sx={{ mt: 4 }}>
      <SearchCard
        product={{
          name: "Brain Activity Book for Kids",
          description:
            "The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!",
          img: "https://m.media-amazon.com/images/I/51Z-1mZDiZL._SX388_BO1,204,203,200_.jpg",
          price: "100",
        }}
      />

      <SearchCard
        product={{
          name: "Brain Activity Book for Kids",
          description:
            "The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!",
          img: "https://m.media-amazon.com/images/I/51Z-1mZDiZL._SX388_BO1,204,203,200_.jpg",
          price: "100",
        }}
      />

      <SearchCard
        product={{
          name: "Brain Activity Book for Kids",
          description:
            "The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!",
          img: "https://m.media-amazon.com/images/I/51Z-1mZDiZL._SX388_BO1,204,203,200_.jpg",
          price: "100",
        }}
      />
    </Box>
  );
};

export default Search;
