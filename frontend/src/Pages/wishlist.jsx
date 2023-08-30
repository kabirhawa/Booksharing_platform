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
import React, { useState } from "react";
import image1 from "../images/1159.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import image2 from "../images/7492664.jpg";
import image3 from "../images/19021605.jpg";

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
  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="..."
            imageUrl={image1}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="..."
            imageUrl={image2}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="..."
            imageUrl={image3}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="..."
            imageUrl={image3}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="..."
            imageUrl={image3}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="..."
            imageUrl={image3}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wishlist;
