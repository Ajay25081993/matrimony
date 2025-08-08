import React from "react";

const Welcome = () => {
  return (
    <div className="w-1/2 bg-gradient-to-b from-purple-400 to-purple-600 flex justify-center items-center py-6 shadow-md rounded-r-md">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow">
        👋 Welcome to <span className="italic text-yellow-300">SoulTalk</span>
      </h1>
    </div>
  );
};

export default Welcome;
