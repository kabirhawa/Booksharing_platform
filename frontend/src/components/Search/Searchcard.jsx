import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnakbar } from "../../store/slices/snakbar";
import { saveWishList, sendRequest } from "../../Service/books.service";

export default function SearchCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = useState();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setRequest(event.target.value);
  };

  const handleSubmit = () => {
    if (request) {
      sendRequest({
        message: request,
        bookownerid: product.data.userId,
        bookid: product.data._id,
      })
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
  const handleClickOpen = () => {
    setOpen(true);
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
      <Card
        sx={{
          display: "flex",
          m: 2,
          overflow: "auto",
          maxWidth: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
        }}
      >
        <Grid container>
          <Grid item lg={2} md={3} sm={4} xs={4}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/book/view"}
              state={product.data}
            >
              <CardMedia
                component="img"
                sx={{ maxWidth: 151, width: "100%", height: "auto" }}
                image={product.img}
                alt="Live from space album cover"
              />
            </Link>
          </Grid>

          <Grid item lg={10} md={9} sm={8} xs={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                  justifyContent: "left",
                  textAlign: "left",
                  pl: 1,
                  pb: 1,
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/book/view"}
                  state={product.data}
                >
                  <Typography
                    gutterBottom
                    variant={window.innerWidth < 576 ? "h6" : "h5"}
                    component="div"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: {
                        lg: "block",
                        md: "block",
                        sm: "block",
                        xs: "none",
                      },
                    }}
                  >
                    {window.innerWidth < 576
                      ? product.description.slice(0, 50) + "..."
                      : window.innerWidth > 576 && window.innerWidth < 960
                      ? product.description.slice(0, 100) + "..."
                      : product.description.slice(0, 200) + "..."}
                  </Typography>
                </Link>
                <Box
                  gutterBottom
                  sx={{
                    display: {
                      lg: "flex",
                      md: "flex",
                      sm: "flex",
                      xs: "block",
                    },
                    justifyContent: "space-between",
                    mt: { lg: 2, md: 2, sm: 2, xs: 0 },
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    By: {product.author}
                  </Typography>

                  <Box sx={{ display: "flex" }}>
                    <ThemeProvider theme={theme}>
                      <Button onClick={handleSwitchChange}>
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
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
