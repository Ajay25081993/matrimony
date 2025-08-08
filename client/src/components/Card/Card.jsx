import React from "react";
const Card = ({ image, name, feedback }) => {
  return (
  
      <div className="w-85 lg:w-90 lg:h-120  transition-shadow delay-100 shadow-md shadow-gray-400 hover:shadow-gray-400 hover:shadow-xl">
        <img src={image} alt="" className=" w-full h-60" />
        <div className="p-4">
          <h1 className="text-2xl">{name}</h1>
          <p className="text-gray-500">{feedback}</p>
        </div>
      </div>
 
  );
};

export default Card;
