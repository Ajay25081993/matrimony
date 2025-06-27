import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import Header from "../../components/Header/Header4";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({});

  const user_id = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${user_id}`
      );
      setUserData(dataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
      fetchData();
    }, []);
  return (
    <div>
      <Header profilePic={userData.profilePic} userData={userData}/>
      <UserProfile/>
    </div>
  );
};

export default UserProfilePage;
