import React from "react";

const Footer2 = () => {
  return (
    <div className=" w-full bg-white flex justify-center items-center mt-2 flex-col">
      <div className="p-4 flex flex-col justify-center items-center gap-10">
        <p className="text-3xl">Why register on SoulBandhan.com?</p>
        <div className="bg-red-500 h-[2px] w-20 "></div>

        <div className="w-5xl flex justify-center items-center gap-25 text-center">
          <div className="flex w-85 justify-center items-center flex-col h-40 gap-2">
            <i className="ri-shield-star-fill shadow-md shadow-gray-500  bg-green-200 flex justify-center items-center text-4xl h-15 w-15 rounded-full text-white"></i>
            <h3 className="text-gray-600 font-bold">No. 1 rated site</h3>
            <p className="text-gray-500 text-md ">
              Most reccomended matchmaking service
            </p>
          </div>
          <div className="flex w-85 h-40 justify-center items-center flex-col gap-2">
            <i className="ri-diamond-ring-fill shadow-md shadow-gray-500 bg-sky-300 flex justify-center items-center text-4xl h-15 w-15 rounded-full text-white"></i>
            <h3 className="text-gray-600 font-bold">History of success</h3>
            <p className="text-gray-500 text-md ">
              6 Million Matches and counting!
            </p>
          </div>
          <div className="flex w-100 h-40 justify-center items-center flex-col gap-2">
            <i className="ri-lock-2-fill shadow-md shadow-gray-500 bg-amber-400 flex justify-center items-center text-4xl h-15 w-15 rounded-full text-white"></i>
            <h3 className="text-gray-600 font-bold">100% Privacy</h3>
            <p className="text-gray-500 text-md ">
              100% Controls on your Photos and info
            </p>
          </div>
          <div className="flex w-140 justify-center items-center flex-col gap-2">
            <i className="ri-check-line font-bold shadow-md shadow-gray-500 bg-yellow-400 flex justify-center items-center text-4xl h-15 w-15 rounded-full text-white"></i>
            <h3 className="text-gray-600 font-bold">Fully Secure</h3>
            <p className="text-gray-500 text-md ">
              Patent pending technology for your safety
            </p>
          </div>
        </div>
      </div>
      <div className="border-t-1 border-t-gray-400 w-full flex justify-around text-sm text-gray-500 p-2 items-center">
        <p>1996-2025 SoulBandhan.com - The World's No.1 Matchmaking Service <sup>TM</sup></p>
        <p>Passionately created by <span className="text-sky-400">S & R group</span> </p>
     </div>
    </div>
  );
};

export default Footer2;
