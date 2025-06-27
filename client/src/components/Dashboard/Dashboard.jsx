import React from "react";

import hs from "../../assets/horoscope.png";
import vf from "../../assets/verified.png";
// import family from "../../assets/family.png";

const Dashboard = ({ userData }) => {
  
  return (
    <div className=" flex bg-gray-100 py-6 justify-center gap-5 w-full mt-8">
      <div className="bg-white border-1 border-gray-300 rounded-md w-60 text-gray-500 space-y-2">
        <div className="w-60 h-60 overflow-hidden rounded-t-md">
          <img src={userData.profilePic} className="w-full object-cover" alt="" />
        </div>

        <div className="flex items-center w-full justify-between cursor-pointer px-3 py-1">
          <p className="text-sm">
            {userData.firstName + " " + userData.lastName}
          </p>
          {/* <i class="ri-edit-2-fill mt-1 text-cyan-300"></i> */}
        </div>
        <hr className="mx-3 text-gray-300" />
        <div className="flex items-center w-full justify-between  cursor-pointer px-3 py-1">
          <div>
            <p className="text-sm">Account Type</p>
            <p className="text-[15px]">Free Membership</p>
          </div>
          <p className="text-cyan-300">Upgrade</p>
        </div>
        <hr className="mx-3 text-gray-300" />
        <div className="flex items-center w-full justify-between  cursor-pointer px-3 py-1">
          <div>
            <p className="text-black">Blue Tick Verified</p>
            <p className="text-sm">valid till 8-june-2026</p>
          </div>
          <i class="ri-verified-badge-fill text-cyan-300 text-3xl"></i>
        </div>
      </div>

      <div className=" space-y-4 w-120">
        <div className="space-y-2 ">
          <p>Your Activity Summary</p>
          <div className="flex flex-wrap gap-1 ">
            <div className="border-1 border-gray-300 rounded-md px-2 bg-white">
              <p className="text-2xl text-gray-300 font-bold">0</p>
              <p className="text-gray-500 text-sm">No Pending Invitations</p>
            </div>
            <div className="border-1 border-gray-300 rounded-md px-2 bg-white">
              <p className="text-2xl text-gray-300 font-bold">0</p>
              <p className="text-gray-500 text-sm">No Accepted Invitations</p>
            </div>
            <div className="border-1 border-gray-300 rounded-md px-2 bg-white">
              <p className="text-2xl text-gray-300 font-bold">0</p>
              <p className="text-gray-500 text-sm">No Recent Visitors</p>
            </div>
            <div className="border-1 border-gray-300 rounded-md px-2 bg-white">
              <p className="text-2xl text-gray-300 font-bold">0</p>
              <p className="text-gray-500 text-sm">Contacts viewed</p>
            </div>
            <div className="border-1 border-gray-300 rounded-md px-2 bg-white">
              <p className="text-2xl text-gray-300 font-bold">0</p>
              <p className="text-gray-500 text-sm">Chats viewed</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p>Improve Your Profile</p>
          <div className="flex flex-col gap-2 border-1 border-gray-300 h-56 rounded-md items-center justify-center">
            <div className="h-15 flex w-50 items-center  font-semibold justify-between  cursor-pointer hover:bg-gray-100 border-1 border-gray-300 rounded-xl p-2 bg-white">
              <img src={vf} alt="" className="w-12 h-12" />{" "}
              <p>Verify Profile</p>
            </div>
            <div className="w-50 h-15 flex itcems-center justify-between font-semibold   cursor-pointer hover:bg-gray-100 border-1 border-gray-300 rounded-xl p-2 bg-white">
              <img src={hs} alt="" className="w-10 h-10" />{" "}
              <p className="mt-1.5">Add Horoscope</p>
            </div>{" "}
            {/* <div className="w-50 h-15 flex itcems-center justify-between font-semibold   cursor-pointer hover:bg-gray-100 border-1 border-gray-300 rounded-xl p-2 bg-white">
              <img src={family} alt="" className="w-10 h-10" />{" "}
              <p className="mt-1.5">Family Details</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
