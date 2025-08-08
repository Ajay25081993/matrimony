import React from "react";
import Logo from "../../assets/SoulBandhan.png";

const Header = () => {
  return (
    <div className="absolute top-0 w-full px-50 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 shadow-md shadow-gray-900">
      <div className="w-35 ">
        <img src={Logo} className="object-cover w-full" alt="" />
      </div>

      {/* <div className="flex items-center gap-3 text-white">
        <div onClick={()=>{setShowLogin(true)}} className="flex gap-1 cursor-pointer items-center justify-center">
          <span className="hover:underline">Login</span>
          <i className="ri-arrow-down-s-line mt-1"></i>
        </div>
        <p className="cursor-pointer">Help</p>
      </div> */}
    </div>
  );
};

export default Header;
