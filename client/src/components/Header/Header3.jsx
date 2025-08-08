import React, { useEffect, useState } from "react";
import Logo from "../../assets/SoulBandhan.png";
import { Link, useNavigate } from "react-router-dom";
import Hover from "../ProfileHover/Hover";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
const Header = ({
  openPartnerPreferences,
  setOpenPartnerPreferences,
  openDashboard,
  setOpenDashboard,
  openMyProfile,
  setOpenMyProfile,
  openSettings,
  setOpenSettings,
  openMyPhotos,
  setOpenMyPhotos,
  openMore,
  setOpenMore,
}) => {
  const [userData, setUserData] = useState([]);
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const openInbox = () => {
    navigate("/inbox");
  };
  const openMyProfilePage = () => {
    navigate("/my-profile");
  };
  const openSettingsPage = () => {
    navigate("/settings");
  };
  const openMyPhotosPage = () => {
    navigate("/my-photos");
  };
  const openInterestPage = () => {
    navigate("/more");
  };
  const openPartnerPreferencesPage = () => {
    navigate("/partner-preferences");
  };
  const openHomePage = () => {
    navigate("/home");
  };

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

  // bg-[#a45ac1] #470f65dd
  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-sm bg-[#470f65dd]">
      <div className="w-full h-21 py-1 px-50  flex justify-between items-center">
        <div>
          <img src={Logo} alt="" className="w-45" />
        </div>

        <div className="flex items-center gap-8 text-white">
          <div
            onClick={() => {
              openHomePage();
              setOpenDashboard(true);
              setOpenMyProfile(false);
              setOpenMyPhotos(false);
              setOpenPartnerPreferences(false);
              setOpenSettings(false);
              setOpenMore(false);
            }}
            className="cursor-pointer  flex items-center gap-1"
          >
            <i className="ri-home-4-fill mt-1 text-xl"></i>
            <span>Home</span>
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
            <Link to="/interests">
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

      <div className="bg-white w-full shadow-md shadow-gray-400 text-gray-500 flex gap-15 py-1 items-center justify-center">
        <span
          className={`cursor-pointer ${
            openDashboard ? "text-red-500 underline underline-offset-8" : ""
          }`}
          onClick={() => {
            openHomePage();
          }}
        >
          Dashboard
        </span>

        <div className="flex gap-2">
          <div className="animate-pulse ">
            <i class="ri-profile-fill text-gray-500"></i>
          </div>

          <span
            className={`cursor-pointer ${
              openMyProfile ? "text-red-500 underline underline-offset-8 " : ""
            }`}
            onClick={() => {
              openMyProfilePage();
            }}
          >
            My Profile
          </span>
        </div>

        <div className="flex gap-2">
          <div className="animate-ping ">
            <i class="ri-multi-image-fill text-gray-500"></i>
          </div>

          <span
            className={`cursor-pointer ${
              openMyPhotos ? "text-red-500 underline underline-offset-8 " : ""
            }`}
            onClick={() => {
              openMyPhotosPage();
            }}
          >
            My Photos
          </span>
        </div>

        <div className="flex gap-2">
          <div className="animate-pulse">
            <i class="ri-user-heart-fill text-gray-500"></i>{" "}
          </div>
          <span
            className={`cursor-pointer ${
              openPartnerPreferences
                ? "text-red-500 underline underline-offset-8 "
                : ""
            }`}
            onClick={() => {
              openPartnerPreferencesPage();
              // setOpenPartnerPreferences(true);
              // setOpenDashboard(false);
              // setOpenMyProfile(false);
              // setOpenMyPhotos(false);
              // setOpenSettings(false);
              // setOpenMore(false);
            }}
          >
            Partner Preferences
          </span>
        </div>

        {/* <div className="flex gap-2">
          <div className=" animate-spin">
            <i className="ri-settings-3-fill  text-gray-500"></i>
          </div>
          <span
            className={`cursor-pointer ${
              openSettings ? "text-red-500 underline underline-offset-8 " : ""
            }`}
            onClick={() => {
              openSettingsPage();
              // setOpenSettings(true);
              // setOpenDashboard(false);
              // setOpenMyProfile(false);
              // setOpenMyPhotos(false);
              // setOpenPartnerPreferences(false);
              // setOpenMore(false);
            }}
          >
            Settings
          </span>
        </div>

        <div className="flex gap-2">
          <div className=" animate-bounce">
            <i class="ri-arrow-down-s-line"></i>
          </div>

          <span
            className={`cursor-pointer ${
              openMore ? "text-red-500 underline underline-offset-8 " : ""
            }`}
            onClick={() => {
              openMorePage();
            }}
          >
            More
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
