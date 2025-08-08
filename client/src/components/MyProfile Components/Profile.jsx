import React, { useEffect, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../constants/apiUrls";
import axiosInstance from "../../lib/axios";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    const fetchData = async (user_id) => {
      try {
        const dataResponse = await axiosInstance.get(
          `${API_URLS.GET_USER_BY_ID}/${user_id}`
        );
        const infoResponse = await axiosInstance.get(
          `${API_URLS.GET_INFO_BY_USER_ID}/${user_id}`
        );
        setUserInfo(infoResponse.data[0]);
        setUserData(dataResponse.data[0]);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchData(user_id);
  }, []);
  const navigate = useNavigate();

  const goPreviewPage = () => {
    navigate("/profile-preview");
  };

  return (
    <div className="profilePhotoComponent">
      <div className=" flex flex-col items-center space-y-1 bg-gray-200 h-53 rounded-t-xl rounded-b-xl">
        <div className="h-45 w-40  transition-all duration-300 ease-in-out overflow-hidden rounded-t-md relative">
          <img
            src={userData.profilePic}
            alt=""
            className="object-cover w-full "
          />
        </div>

        <Link
          to="/my-photos"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Add/Edit Photos
        </Link>
      </div>

      <div className="space-y-3 ">
        <div>
          <p className="text-xl font-bold">
            {userData.firstName + " " + userData.lastName}
          </p>
          <p className="text-gray-400">
            Profile created for {userData.createdFor}
          </p>
        </div>

        <p className="font-semibold">
          {userData.age} Years, {userInfo.height}{" "}
        </p>
        <p className="font-semibold">
          {userData.religion}, {userInfo.subCommunity}
        </p>
        <p className="font-semibold">
          {userInfo.city}, {userData.state}, India
        </p>
        <p className="font-semibold">
          {userInfo.qualification}, {userInfo.workAs},{" "}
          {userInfo.workWith ? userInfo.workWith : ""}
        </p>
        <p>
          {" "}
          <span>
            <i className="ri-smartphone-line font-normal text-xl text-green-300"></i>
          </span>{" "}
          +91-{userData.phoneNo} ({" "}
          <span className="text-green-300">
            <i className="ri-check-fill text-xl"></i> Verified
          </span>{" "}
          ){" "}
          <Link to="/edit-mobile" className="text-blue-500 hover:underline">
            Edit Mobile No
          </Link>
        </p>
      </div>

      <div className="text-center space-y-2">
        <p>
          How your profile looks <br /> to others{" "}
        </p>
        <div
          onClick={() => {
            goPreviewPage();
          }}
          className="cursor-pointer hover:bg-sky-100 border-1 border-gray-300 rounded-md text-blue-600 space-x-2 font-semibold"
        >
          <i class="ri-eye-fill"></i>
          <span>Profile Preview</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
