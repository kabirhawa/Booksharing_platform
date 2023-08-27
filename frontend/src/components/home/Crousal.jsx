import React from "react";
// Import the styles
import CardCrousel from "./CardCrousel";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
// import { Box } from "@mui/material";
const Crousal = (props) => {
  document.documentElement.style.setProperty(
    "--swiper-pagination-bottom",
    "0px"
  );
  return (
    <Box className="carousel-container" sx={{ m: 3 }}>
      <Typography variant="h3">{props.title}</Typography>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        breakpoints={{
          // when window width is >= 1280px (lg)
          1280: {
            slidesPerView: 5,
            scrollbar: {
              hide: true, // Hide scrollbar for this breakpoint
            },
          },
          // when window width is >= 768px (md)
          768: {
            slidesPerView: 3,
            scrollbar: {
              hide: true, // Hide scrollbar for this breakpoint
            },
          },
          600: {
            slidesPerView: 2,
            scrollbar: {
              hide: true, // Hide scrollbar for this breakpoint
            },
          },
          // when window width is >= 0px (sm)
          0: {
            slidesPerView: 1,
            scrollbar: {
              hide: true, // Hide scrollbar for this breakpoint
            },
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true, hide: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {props.cards.map((card) => (
          <SwiperSlide>
            <CardCrousel
              id={card._id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Crousal;
