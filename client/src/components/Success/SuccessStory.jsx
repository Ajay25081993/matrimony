import React from "react";
import Slider from "react-slick";
import Card from "../Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../Carousel/Carousel";

const SuccessStory = () => {
  // className="w-full flex  items-center justify-center "
  return (
    <div className="flex flex-col items-center justify-center lg:py-20 py-10">
      <p className="text-red-500 lg:mb-20 mb-10 lg:text-4xl text-3xl text-center">
        Matrimony Service with Millions of Success Stories
      </p>
      <Carousel slideToShow={3} slideToScroll={3}/>
    </div>
  );
};

export default SuccessStory;
