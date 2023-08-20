import React from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  console.log(location.state.value);
  return <div>this is search</div>;
};

export default Search;
