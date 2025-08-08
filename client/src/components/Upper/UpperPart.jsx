import React from "react";
import bgImage from "../../assets/BgImage2.jpg";
import Header from "../Header/Header";
import LowerOfUpper from "../LowerOfUpper.jsx/LowerOfUpper";
const UpperPart = ({
  showLogin,
  setShowLogin,
  showRegister,
  setShowRegister,
}) => {
  return (
    <div
      className="flex flex-col  justify-between items-center w-full h-screen lg:h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Header showLogin={showLogin} setShowLogin={setShowLogin} />
      <LowerOfUpper
        showRegister={showRegister}
        setShowRegister={setShowRegister}
      />
    </div>
  );
};

export default UpperPart;
