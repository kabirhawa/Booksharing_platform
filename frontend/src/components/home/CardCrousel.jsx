import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { saveWishList, sendRequest } from "../../Service/books.service";
import { useDispatch } from "react-redux";
import { showSnakbar } from "../../store/slices/snakbar";
import { Link } from "react-router-dom";

const CardCrousel = ({ title, description, imageUrl, id, userId, card }) => {
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = useState(null);

  const handleChange = (event) => {
    setRequest(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    if (request) {
      sendRequest({ message: request, bookownerid: userId, bookid: id })
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

  const theme = createTheme({
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
    <>
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
      <Card sx={{ maxWidth: 345 }}>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/book/view"}
          state={card}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={imageUrl[0].base64}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Link>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => {
                handleSwitchChange(id);
              }}
            >
              {isFavorite ? (
                <FavoriteIcon color="pink" />
              ) : (
                <FavoriteBorderIcon color="pink" />
              )}
            </Button>
          </ThemeProvider>
          <Button onClick={handleClickOpen}>
            <PersonAddIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CardCrousel;
