import React from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../components/Search/Searchcard";
import { Box } from "@mui/material";
import image1 from "../images/1159.jpg";
import image2 from "../images/7492664.jpg";
import image3 from "../images/19021605.jpg";
// import image4 from "../images/OJK93M0.jpg";
// import image5 from "../images/ORJ9ZL0.jpg";

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
          img: image1,
          price: "100",
        }}
      />

      <SearchCard
        product={{
          name: "Brain Activity Book for Kids",
          description:
            "The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!",
          img: image2,
          price: "100",
        }}
      />

      <SearchCard
        product={{
          name: "Brain Activity Book for Kids",
          description:
            "The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!",
          img: image3,
          price: "100",
        }}
      />
    </Box>
  );
};

export default Search;
