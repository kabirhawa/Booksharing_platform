import { styled } from "@mui/material";
import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CardCrousel = ({ title, description, imageUrl }) => {
  const RootCard = styled(Card)({
    maxWidth: 300,
    margin: "0 auto",
    position: "relative",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  });

  const Media = styled(CardMedia)({
    height: 0,
    paddingTop: "56.25%", // 16:9 aspect ratio
    backgroundSize: "cover",
  });

  const Content = styled(CardContent)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    width: "100%",
  }));

  return (
    <RootCard>
      <Media image={imageUrl} title={title} />
      <Content>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" component="div">
          {description}
        </Typography>
      </Content>
    </RootCard>
  );
};

export default CardCrousel;
