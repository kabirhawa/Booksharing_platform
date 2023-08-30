import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  Card,
  CardContent,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteBooks, getUserBooks } from "../../Service/books.service";
import { useDispatch, useSelector } from "react-redux";
import { setMyBooks } from "../../store/slices/book";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { showSnakbar } from "../../store/slices/snakbar";

const rowsPerPageOptions = [5, 10, 25];

const MyBooks = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const user = useSelector((state) => state.user).user;
  const myBooks = useSelector((state) => state.books).MyBooks;
  console.log(myBooks);
  const getBook = () => {
    getUserBooks(user?._id)
      .then((data) => {
        console.log(data.data.data);
        dispatch(setMyBooks(data.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBook();
  }, [user]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData =
    myBooks &&
    myBooks?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const displayedData =
    filteredData &&
    filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ margin: "20px", borderRadius: "10px" }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <IconButton
          color="primary"
          sx={{ pr: 3, pl: 3 }}
          onClick={() => navigate("add")}
        >
          +
        </IconButton>
      </CardContent>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData &&
              displayedData?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>
                    <Tooltip title={"Edit this book details"}>
                      <IconButton
                        onClick={() => {
                          navigate("/mybooks/edit", { state: row });
                        }}
                      >
                        <ModeIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete this book "}>
                      <IconButton
                        onClick={() => {
                          deleteBooks(row._id)
                            .then(() => {
                              getBook();
                              dispatch(
                                showSnakbar({
                                  message: "Book has been Deleted successfully",
                                  open: true,
                                  type: "success",
                                })
                              );
                            })
                            .catch(() => {
                              dispatch(
                                showSnakbar({
                                  message: "Unable to Delete Book",
                                  open: true,
                                  type: "error",
                                })
                              );
                            });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={
            filteredData && filteredData.length > 0 ? filteredData.length : 0
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  );
};

export default MyBooks;
