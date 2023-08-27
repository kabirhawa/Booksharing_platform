import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import image1 from "../images/1159.jpg";
import image2 from "../images/7492664.jpg";
import image3 from "../images/19021605.jpg";

const WishListCard = ({ imageUrl, title, description }) => {
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
    </Card>
  );
};
const Wishlist = () => {
  return (
    <Box>
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
      </Grid>
    </Box>
  );
};

export default Wishlist;
