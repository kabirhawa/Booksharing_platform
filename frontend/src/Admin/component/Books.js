import ReactDOM from "react-dom";
import BookData from "./bookData";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";

// import {allUser} from '../../Service/user.service'


const Books = () => {
//   const dispatch = useDispatch();
  const [data, setData] = useState([]);

//   useEffect(() => {
//     allUser()
//     .then((data) => {
//       (setData(data));
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   }, []);
  // console.log(data.data);
  // alert(data.mobile);

  const handleEdit = (id) => {
    // Implement logic to handle editing for the specific id
  };

  const handleDelete = (id) => {};

  return (
    <div>
      <BookData data={{ data }} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
export default Books;
