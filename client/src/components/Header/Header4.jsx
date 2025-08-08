import React, { useEffect, useState } from "react";
import Logo from "../../assets/SoulBandhan.png";
// import Logo from "../../assets/S B.png";

import { Link, useNavigate } from "react-router-dom";
import Hover from "../ProfileHover/Hover";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
const Header = () => {
  const [userData, setUserData] = useState([]);
  const [homeColor, setHomeColor] = useState(false);
  const id = localStorage.getItem("userId");
  const fetchData = async () => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${id}`
      );

      setUserData(dataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();

  const openInbox = () => {
    navigate("/inbox");
  };

  const openHomePage = () => {
    navigate("/home");
  };
  return (
    <div className="w-full fixed top-0 left-0 z-50">
      {/* <div className="w-full h-21 px-55 py-1 bg-[#470f65dd] backdrop-blur-sm flex justify-between items-center shadow-md shadow-zinc-900">
        <div>
          <img src={Logo} alt="" className="w-45" />
        </div>

        <div className="flex items-center gap-8 text-white">
          <div onClick={() => handleHomeClick()} className="cursor-pointer">
            <span>Home</span>
          </div>
          <span className="cursor-pointer">
            Matches{" "}
            <sup className="bg-yellow-50 text-black text-[15px] px-1 rounded-full">
              100
            </sup>
          </span>
          <span>Search</span>
          <span
            onClick={() => {
              openInbox();
            }}
            className="cursor-pointer"
          >
            Inbox
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="border-1 border-white px-6 py-0.5 flex items-center gap-1 text-white cursor-pointer">
            <i class="ri-vip-crown-fill mt-1"></i>
            <p>Upgrade Now</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-white">
            <span>Help</span>
            <i class="ri-arrow-down-s-line mt-1"></i>
          </div>

          <div className="relative group">
            <div className=" relative flex items-center gap-2 cursor-pointer text-white">
               <div className="h-12 w-12 transition-all duration-300 ease-in-out overflow-hidden rounded-full relative">
                <img
                  src={profilePic}
                  className="object-cover w-full"
                  alt=""
                />
              </div>
              <i class="ri-arrow-down-s-line mt-1"></i>
            </div>
            <Hover userData={userData} className="group-hover:block hidden top-5 -right-18" />
          </div>
        </div>
      </div> */}

      <div className="w-full h-21 py-1 px-55 bg-[#650f52e2] backdrop-blur-sm flex justify-between items-center shadow-md shadow-zinc-900">
        <div>
          <img src={Logo} alt="" className="w-45" />
        </div>

        <div className="flex items-center gap-8 text-white">
          <div
            onClick={() => {
              openHomePage();
              setHomeColor(true);
            }}
            className="cursor-pointer  flex items-center gap-1"
          >
            <i className="ri-home-4-fill mt-1 text-xl"></i>
            <span className={`${homeColor ? "text-pink-400" : ""}`}>Home</span>
          </div>

          <div className="cursor-pointer flex  items-center gap-1">
            <i className="ri-group-2-fill  text-xl mt-1"></i>
            <Link to="/matches/all-matches">
              <span>
                Matches
                <sup className="bg-yellow-50 text-black text-[15px] px-1 rounded-full">
                  100
                </sup>
              </span>
            </Link>
          </div>

          <div className="cursor-pointer flex  items-center gap-1">
            <i className="ri-group-2-fill  text-xl mt-1"></i>
            <Link to="/interests/received/all-interests">
              <span>
                Interests
                <sup className="bg-yellow-50 text-black text-[15px] px-1 rounded-full">
                  100
                </sup>
              </span>
            </Link>
          </div>

          <Link to="/search">
            <div className="cursor-pointer flex  items-center gap-1">
              <i class="ri-search-line text-xl mt-1"></i>
              <span>Search</span>
            </div>
          </Link>

          <span
            onClick={() => {
              openInbox();
            }}
            className="cursor-pointer"
          >
            Inbox
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* <div className="border-1 border-white px-6 py-0.5 flex items-center gap-1 text-white cursor-pointer">
            <i class="ri-vip-crown-fill mt-1"></i>
            <p>Upgrade Now</p>
          </div> */}
          <div className="flex items-center gap-2 cursor-pointer text-white">
            <span>Help</span>
            <i class="ri-arrow-down-s-line mt-1"></i>
          </div>
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer text-white">
              <div className="h-12 w-12 transition-all duration-300 ease-in-out overflow-hidden rounded-full relative">
                <img
                  src={userData.profilePic}
                  className="object-cover w-full"
                  alt=""
                />
              </div>

              <i class="ri-arrow-down-s-line mt-1"></i>
            </div>
            <Hover
              userData={userData}
              className="group-hover:block hidden top-12 -right-18"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
