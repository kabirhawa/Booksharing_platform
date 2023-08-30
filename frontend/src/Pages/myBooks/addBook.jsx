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
import { editBooks, saveBooks } from "../../Service/books.service";
import { showSnakbar } from "../../store/slices/snakbar";
import { useLocation } from "react-router-dom";

// {
//     userid: req.decoded.userid,
//     title: req.body.title,
//     author: req.body.author,
//     genre: req.body.gener,
//     description: req.body.description,
//     bookurl:req.body.bookurl
//   }

// const imageSchema = ;

const AddBook = () => {
  function getBase64Size(base64String) {
    // Remove data URL prefix if it exists
    const cleanedBase64 = base64String.replace(/^data:image\/\w+;base64,/, "");

    // Convert the base64 string to binary data
    const binaryData = new Uint8Array(atob(cleanedBase64).split("").map((char) => char.charCodeAt(0)));

    // Get the size of the binary data
    return binaryData.length; // Size in bytes
  }
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
          base64: Yup.mixed()
            .required("Image file is required")
            .test("fileSize", "File size is too large", (value) => {
              if (!value) return true; // Allow empty values to pass

              const sizeInBytes = getBase64Size(value);

              return sizeInBytes <= 500 * 1024; // 500KB in bytes
            }),
          isCover: Yup.boolean(),
        })
      ),
  });
  const location = useLocation();
  const rowData = location.state;

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
          BookName: rowData && rowData.title ? rowData.title : "",
          description:
            rowData && rowData.description ? rowData.description : "",
          author: rowData && rowData.author ? rowData.author : "",
          genre: rowData && rowData.genre ? rowData.genre : [],
          images: rowData && rowData.bookurl ? rowData.bookurl : [],
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
          if (rowData && rowData._id) {
            console.log("edit");
            editBooks(rowData._id, obj)
              .then((data) => {
                dispatch(
                  showSnakbar({
                    message: "Book has been updated successfully",
                    open: true,
                    type: "success",
                  })
                );
              })
              .catch((err) => {
                console.log(err);
                dispatch(
                  showSnakbar({
                    message: "Unable to update Book details",
                    open: true,
                    type: "error",
                  })
                );
              });
          } else {
            console.log("error");
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
          }
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
            {console.log(values)}
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
                      value={values.BookName}
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
                      value={values.description}
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
                      value={values.author}
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
                      defaultValue={values.genre}
                      onChange={(_, newValue) => {
                        // Combine the existing values with the new values
                        const combinedValues = [...values.genre, ...newValue];
                        // Use a Set to remove duplicates, then convert back to an array
                        const uniqueValues = [...new Set(combinedValues)];
                        // Use the unique values to update the "genre" field
                        setFieldValue("genre", uniqueValues);
                      }}
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
                        overflowY: "auto",
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
                    {rowData ? "Edit" : "Submit"}
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
