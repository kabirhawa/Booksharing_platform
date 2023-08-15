import React from "react";
// Import the styles
import CardCrousel from "./CardCrousel";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Box } from "@mui/material";
const Crousal = (props) => {
  return (
    <div className="carousel-container">
      <h1>Welcome to Our Book Carousel</h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {props.cards.map((card) => (
          <SwiperSlide>
            <CardCrousel
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Crousal;
