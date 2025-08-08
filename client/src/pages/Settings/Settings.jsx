import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header4";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import Setting from "../../components/Profile Settings/Setting";
const Settings = () => {
  const [openSettings, setOpenSettings] = useState(true);
  const [userData, setUserData] = useState([]);
  const user_id = localStorage.getItem("userId");
  const fetchData = async () => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${user_id}`
      );
      console.log(dataResponse);

      setUserData(dataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);
  return (
    <div className="w-full">
      <Header
        profilePic={userData.profilePic}
        userData={userData}
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />
      <Setting />
    </div>
  );
};

export default Settings;
