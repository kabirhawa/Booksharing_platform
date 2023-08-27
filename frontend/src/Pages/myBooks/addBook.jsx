import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { Formik } from "formik";

import React from "react";
import * as Yup from "yup";
import MyDropZone from "./dropZone";
import { useDispatch, useSelector } from "react-redux";
import { saveBooks } from "../../Service/books.service";
import { showSnakbar } from "../../store/slices/snakbar";

// {
//     userid: req.decoded.userid,
//     title: req.body.title,
//     author: req.body.author,
//     genre: req.body.gener,
//     description: req.body.description,
//     bookurl:req.body.bookurl
//   }
const AddBook = () => {
  const Validation = Yup.object().shape({
    BookName: Yup.string().required("Name is required"),
    description: Yup.string().required("description is required"),
    author: Yup.string().required("author is required"),
    genres: Yup.array().min(1, "At least one genre is required"),
    images: Yup.array()
      .required("At least 3 images are required")
      .max(3, "Maximum of 3 images allowed")
      .of(
        Yup.object().shape({
          file: Yup.mixed().required("Image file is required"),
          isCover: Yup.boolean(),
        })
      ),
  });

  const genres = [
    "Fiction",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Fantasy",
    // Add more genres here...
  ];
  const user = useSelector((state) => state.user).user;
  const dispatch = useDispatch();
  return (
    <Card sx={{ margin: "20px", borderRadius: "10px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Book Details
        </Typography>
      </CardContent>
      <Formik
        initialValues={{
          BookName: "",
          description: "",
          author: "",
          genre: [],
          images: [],
        }}
        validationSchema={Validation}
        onSubmit={(values) => {
          console.log(values);
          const obj = {
            userid: user._id,
            title: values.BookName,
            author: values.author,
            genre: values.genre,
            description: values.description,
            bookurl: values.images,
          };
          saveBooks(obj)
            .then((data) => {
              console.log(data);
              dispatch(
                showSnakbar({
                  message: "Book is live for sale",
                  open: true,
                  type: "success",
                })
              );
            })
            .catch((err) => {
              console.log(err);
              dispatch(
                showSnakbar({
                  message: "Unable to save Book",
                  open: true,
                  type: "error",
                })
              );
            });
        }}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          handleChange,
          touched,
          errors,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Box sx={{ p: 2, mt: 5, mb: 5 }}>
                <Grid container sx={{ mt: 3, mb: 3 }}>
                  <Grid xs={12} sx={{ mt: 3, mb: 3 }}>
                    <TextField
                      type="text"
                      id="BookName"
                      fullWidth
                      label={"Book Name:"}
                      onChange={handleChange}
                      name="BookName"
                      error={touched.BookName && !!errors.BookName}
                      helperText={touched.BookName && errors.BookName}
                    />
                  </Grid>
                  <br />
                  <Grid xs={12} sx={{ mt: 3, mb: 3 }}>
                    <TextField
                      multiline
                      label={"Description"}
                      rows={3}
                      fullWidth
                      id="description"
                      name="description"
                      onChange={handleChange}
                      error={touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <br />
                  <Grid xs={12} sx={{ mt: 3, mb: 3 }}>
                    <TextField
                      label={"Author"}
                      fullWidth
                      id="author"
                      name="author"
                      onChange={handleChange}
                      error={touched.author && !!errors.author}
                      helperText={touched.author && errors.author}
                    />
                  </Grid>
                  <br />
                  <Grid xs={12} sx={{ mt: 3, mb: 3 }}>
                    <Autocomplete
                      multiple
                      id="genres"
                      options={genres}
                      value={values.genres}
                      onChange={(_, newValue) =>
                        setFieldValue("genres", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Genres"
                          error={touched.genres && !!errors.genres}
                          helperText={touched.genres && errors.genres}
                        />
                      )}
                    />
                  </Grid>

                  <Grid xs={12} sx={{ mt: 3, mb: 3 }}>
                    <Card
                      sx={{
                        margin: "20px",
                        borderRadius: "10px",
                        height: "300px",
                      }}
                    >
                      <label>Book Images</label>
                      <br />
                      <Tooltip title="Max images 3 only" arrow>
                        <MyDropZone
                          setFieldValue={setFieldValue}
                          images={values.images}
                        />
                      </Tooltip>
                      <Box sx={{ color: "red" }}>
                        {touched.images && errors.images}
                      </Box>
                    </Card>
                  </Grid>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default AddBook;
