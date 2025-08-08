import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import Header from "../../components/Header/Header4";
import UserProfile from "../../components/UserProfile/UserProfile";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [selectedUserPreference, setSelectedUserPreference] = useState([]);
  // const [loggedUserPreference, setLoggedUserPreference] = useState([]);
  const { id } = useParams();
  // const userId = localStorage.getItem("userId")
  const fetchData = async () => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${id}`
      );
      const infoResponse = await axiosInstance.get(
        `${API_URLS.GET_INFO_BY_USER_ID}/${id}`
      );
      const preferenceResponseOfSelectedUser = await axiosInstance.get(
        `${API_URLS.GET_PREFERENCES_BY_ID}/${id}`
      );
      // const preferenceResponseOfLoggedUser = await axiosInstance.get(
      //   `${API_URLS.GET_PREFERENCES_BY_ID}/${userId}`
      // );
      console.log(dataResponse.data[0]);
      console.log(infoResponse.data[0]);
      console.log(preferenceResponseOfSelectedUser.data[0]);

      setUserInfo(infoResponse.data[0]);
      setUserData(dataResponse.data[0]);
      setSelectedUserPreference(preferenceResponseOfSelectedUser.data[0]);
      // setLoggedUserPreference(preferenceResponseOfLoggedUser.data[0]);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {userData&&userInfo&&selectedUserPreference&&
      <UserProfile
        userData={userData}
        userInfo={userInfo}
        userPreference={selectedUserPreference}
      />}
    </div>
  );
};

export default UserProfilePage;
