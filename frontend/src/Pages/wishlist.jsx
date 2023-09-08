import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import image1 from "../images/1159.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getUser } from "../Service/user.service";
import { setUser } from "../store/slices/user";

const WishListCard = ({ imageUrl, title, description }) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const handleSwitchChange = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "left" }}>
        <Button onClick={handleSwitchChange}>
          {isFavorite ? (
            <FavoriteIcon color="pink" />
          ) : (
            <FavoriteBorderIcon color="pink" />
          )}
        </Button>
      </CardActions>
    </Card>
  );
};
const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.user)?.user?.favorite;
  useEffect(() => {
    getUser().then((response) => {
      dispatch(setUser(response.data.data));
    });
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {wishlist &&
          wishlist.length > 0 &&
          wishlist?.map((data) => (
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <WishListCard
                title={data?.bookadd?.title}
                description={data?.bookadd?.description}
                imageUrl={image1}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
