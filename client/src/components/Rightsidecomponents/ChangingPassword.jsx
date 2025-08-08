import React from "react";

const ChangingPassword = () => {
  return (
    <div className="bg-white py-3 px-4 h-80">
      <div className="w-3xl h-53  text-left  rounded p-3">
        <div className="">
          <p className="font-semibold text-xl">Change Password</p>
          <hr className="border-dotted border-gray-300  w-4/4" />
          <p className="text-sm">
            your password must have a minimum of 6 characters. We recomended you
            choose a alphanumeric password. <br /> like "Soul@123"
          </p>
        </div>
        <div className="flex gap-3 mt-2">
          <div className="">
            <p>Enter Current Password</p>
            <input className="border-1 border-black" type="password" />
          </div>
          <div>
            <p>Enter New Password</p>
            <input className="border-1 border-black" type="password" />
          </div>
          <div>
            <p>Confirm New Password</p>
            <input className="border-1 border-black" type="password" />
          </div>
        </div>
        <div className="mt-25 w-170 text-center flex justify-end">
          <button className="bg-purple-300 hover:bg-purple-400  text-white font-semibold rounded text-center w-35 broder-2 shadow border-gray-300  cursor-pointer">
            {" "}
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangingPassword;
