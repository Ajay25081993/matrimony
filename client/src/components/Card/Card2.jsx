import React from "react";
import { Link } from "react-router-dom";
const Card2 = ({ image, name, feedback }) => {
  return (
    <div className="w-55 px-2.5 rounded-lg py-4 h-65 transition-shadow delay-100 shadow-md shadow-gray-400 hover:shadow-gray-400 hover:shadow-xl bg-white">
      <div className="w-50 h-30 overflow-hidden relative rounded-lg">
        <img src={image} alt="" className="w-full object-cover" />
      </div>

      <div className="">
        <h1 className="text-lg">{name}</h1>
        <p className="text-gray-500 text-sm tracking-tight w-full">
          {feedback.slice(0, 100)}{" "}
          <Link>
            <span className="text-purple-500 cursor-pointer">...Read More</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Card2;
