import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, removeRequest } from "../Service/books.service";
import { showSnakbar } from "../store/slices/snakbar";

const data = [
  { name: "User 1", message: "Hello", id: 1 },
  { name: "User 2", message: "Hi there", id: 2 },
  // Add more data entries as needed
];

const CustomTable = ({ data }) => {
  const dispatch = useDispatch();
  const handleAccept = (id) => {
    acceptRequest(id)
      .then((data) => {
        dispatch(
          showSnakbar({
            message: "Request Accepted",
            open: true,
            type: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          showSnakbar({
            message: "Unable to accept request please check connection",
            open: true,
            type: "error",
          })
        );
      });
  };

  const rejectRequest = (id) => {
    removeRequest(id)
      .then((data) => {
        dispatch(
          showSnakbar({
            message: "Request rejected",
            open: true,
            type: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          showSnakbar({
            message: "Unable to reject request please check connection",
            open: true,
            type: "error",
          })
        );
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: "none" }}>Name</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Message</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ borderBottom: "none" }}>
                {row.username}
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>{row.message}</TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <IconButton
                  onClick={() => {
                    handleAccept(row._id);
                  }}
                  aria-label="Accept"
                  color="primary"
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    rejectRequest(row._id);
                  }}
                  aria-label="Reject"
                  color="secondary"
                >
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MyRequest = () => {
  const inbox = useSelector((state) => state.user).user.inbox;
  return (
    <Card sx={{ margin: "20px", borderRadius: "10px", mb: 30 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Requests
        </Typography>
      </CardContent>
      <CustomTable data={inbox} />
    </Card>
  );
};

export default MyRequest;
