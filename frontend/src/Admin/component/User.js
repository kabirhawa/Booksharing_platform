import ReactDOM from "react-dom";
import DataTable from "./dataTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import {allUser} from '../../Service/user.service'


const User1 = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    allUser()
    .then((data) => {
      (setData(data.data.data));
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);
  // console.log(data.data);
  // alert(data.mobile);

  const handleEdit = (id) => {
    // Implement logic to handle editing for the specific id
  };

  const handleDelete = (id) => {};

  return (
    <div>
      <DataTable data={{ data }} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
export default User1;
