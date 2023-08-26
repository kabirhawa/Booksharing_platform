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
  console.log("here is wishlist");
  return (
    <Box>
      <Grid container>
        <Grid xl={5} lg={5} md={3} sm={2} xs={1} sx={{ mt: 2, mb: 2 }}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!"
            imageUrl={image1}
          />
        </Grid>
        <Grid sx={{ mt: 2, mb: 2 }} lg={5} md={3} sm={2} xs={1}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!"
            imageUrl={image2}
          />
        </Grid>
        <Grid sx={{ mt: 2, mb: 2 }} lg={5} md={3} sm={2} xs={1}>
          <WishListCard
            title="Brain Activity Book for Kids"
            description="The 200+ activities book is ideal to introduce math, language and logic to preschoolers. The colourfully illustrated pages have been designed in a creative manner to teach a variety of skills through fun-filled activities and puzzles and promises to keep your child engaged in hours of learning. Let the fun begin!"
            imageUrl={image3}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wishlist;
