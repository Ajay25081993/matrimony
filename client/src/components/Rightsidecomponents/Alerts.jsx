import React from "react";

const Alerts = () => {
  return (
    <div>
      {" "}
      <div>
        <p className="font-semibold text-2xl">Alerts & Updates</p>{" "}
        <hr className=" border-gray-300 mt-3 w-4/4" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg mt-1">E-Mail</p>
          <p className="text-md">
            Choose what updates you recive on your e-mail
          </p>
        </div>
        <i className="ri-arrow-right-s-line text-black text-2xl"></i>
      </div>
      <hr className=" border-gray-300 mt-3 w-4/4" />
      <div className="flex justify-between items-center">
        <div>
          {" "}
          <p className="font-semibold text-lg mt-1">SMS</p>
          <p className="text-md">Choose what updates you get via SMS</p>
        </div>

        <i className="ri-arrow-right-s-line text-black text-2xl"></i>
      </div>
      <hr className=" border-gray-300 mt-3 w-4/4" />
    </div>
  );
};

export default Alerts;
