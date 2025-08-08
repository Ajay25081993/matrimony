import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { success } from "../Success/success";
import Card2 from "../Card/Card2";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#c3c3c3",
        color: "",
        borderRadius: "9px",
      }}
      onClick={onClick}
    />
  );
}
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 1 slide at a time (containing 3 cards)
    slidesToScroll: 3,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };
  return (
    <div className="container w-[705px]">
      <Slider {...settings}>
        {success.map((data) => {
          return (
            <Card2
              image={data.image}
              name={data.name}
              feedback={data.feedback}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
