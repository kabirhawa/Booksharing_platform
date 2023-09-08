import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../components/Search/Searchcard";
import { Box } from "@mui/material";
import image1 from "../images/1159.jpg";
import image2 from "../images/7492664.jpg";
import image3 from "../images/19021605.jpg";
import { searchBooks } from "../Service/books.service";
// import image4 from "../images/OJK93M0.jpg";
// import image5 from "../images/ORJ9ZL0.jpg";

const Search = () => {
  const location = useLocation();
  console.log(location.state.value);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    searchBooks(location.state.value).then((data) => {
      setSearch(data.data.data);
    });
  }, []);
  return (
    <Box sx={{ mt: 4 }}>
      {search.length > 0 &&
        search?.map((data) => (
          <>
            <SearchCard
              product={{
                name: `${data?.title}`,
                description: `${data.description}`,
                img: `${data.bookurl[0].base64}`,
                author: `${data.author}`,
              }}
            />
          </>
        ))}
    </Box>
  );
};

export default Search;
