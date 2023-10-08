import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import {
  Typography,
  Container,
  Paper,
  makeStyles,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { showSnakbar } from "../store/slices/snakbar";
import { saveWishList, sendRequest } from "../Service/books.service";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailPage = () => {
  const images = [
    "image_url_1",
    "image_url_2",
    "image_url_3",
    // Add more image URLs as needed
  ];
  const theme = useTheme();
  const location = useLocation();
  const book = location.state;

  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = useState(null);
  const user = useSelector((state) => state.user).user;
  const handleChange = (event) => {
    setRequest(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    if (request) {
      sendRequest({ message: request, bookownerid: user._id, bookid: book._id })
        .then(() => {
          dispatch(
            showSnakbar({
              message: "Request has been sent successfully",
              open: true,
              type: "success",
            })
          );
          setRequest(null);
          handleClose();
        })
        .catch((error) => {
          console.error("Error:", error);
          dispatch(
            showSnakbar({
              message: "Unable send request",
              open: true,
              type: "error",
            })
          );
        });
    } else {
      dispatch(
        showSnakbar({
          message: "please Write a message",
          open: true,
          type: "error",
        })
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitchChange = (id) => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    saveWishList(id)
      .then(() => {
        dispatch(
          showSnakbar({
            message: "Added to wishlist success",
            open: true,
            type: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
        dispatch(
          showSnakbar({
            message: "Unable wishlist check your login first",
            open: true,
            type: "error",
          })
        );
      });
  };

  const theme1 = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "pink", // Set the desired color here
          },
        },
      },
    },
  });

  return (
    <Container
      maxWidth="md"
      sx={{ paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4) }}
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Contact Seller please write a message it will be displayed with
            your request if seller accept your request you will get his/her
            contact mail or number to go ahead with the deal
          </DialogContentText>
          <TextField
            autoFocus
            onChange={handleChange}
            value={request}
            margin="dense"
            id="name"
            multiline
            rows={3}
            label="Message"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>send Request</Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={3} sx={{ padding: theme.spacing(3) }}>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {book.bookurl.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.base64}
                style={{ width: "100%", height: "auto" }}
                alt="img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography variant="h5" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="body1">This book is by {book.author}</Typography>
        <Typography variant="body1">
          <div dangerouslySetInnerHTML={{ __html: book.description }}></div>
        </Typography>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <ThemeProvider theme={theme1}>
            <Button
              onClick={() => {
                handleSwitchChange(user._id);
              }}
            >
              {isFavorite ? (
                <FavoriteIcon color="pink" />
              ) : (
                <FavoriteBorderIcon color="pink" />
              )}
            </Button>
          </ThemeProvider>
          <Button color="error">Report</Button>
          <Button onClick={handleClickOpen}>
            <PersonAddIcon />
          </Button>
        </CardActions>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;
