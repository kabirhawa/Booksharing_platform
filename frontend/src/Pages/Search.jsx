import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchCard from "../components/Search/Searchcard";
import { Box, CircularProgress } from "@mui/material";

import { useSelector } from "react-redux";
// import image4 from "../images/OJK93M0.jpg";
// import image5 from "../images/ORJ9ZL0.jpg";

const Search = () => {
  const location = useLocation();
  console.log(location.state.value);
  const search = useSelector((state) => state.books).searchBooks;
  const searching = useSelector((state) => state.books).searching;

  return (
    <Box sx={{ mt: 4 }}>
      {!searching ? (
        search && search.length > 0 ? (
          search?.map((data) => (
            <>
              <SearchCard
                product={{
                  name: `${data?.title}`,
                  description: `${data.description}`,
                  img: `${data.bookurl[0].base64}`,
                  author: `${data.author}`,
                  data: data,
                }}
              />
            </>
          ))
        ) : (
          <>No Data Found</>
        )
      ) : (
        <Box sx={{ margin: "auto", marginTop: "25%", marginBottom: "25%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Search;
