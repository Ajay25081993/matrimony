import React from "react";
import Logo from "../../assets/soulBandhan.png";

const Header = ({ setShowLogin }) => {
  return (
    <div className="w-full flex items-center justify-between pr-8 text-xl lg:justify-around lg:text-lg">
      <div>
        <img src={Logo} className="lg:w-45 w-40" alt="" />
      </div>

      <div className="flex items-center gap-3 text-white">
        <div
          onClick={() => {
            setShowLogin(true);
          }}
          className="flex gap-1 cursor-pointer items-center justify-center"
        >
          <span className="hover:underline">Login</span>
          <i className="ri-arrow-down-s-line mt-1"></i>
        </div>
        <p className="cursor-pointer">Help</p>
      </div>
    </div>
  );
};

export default Header;
