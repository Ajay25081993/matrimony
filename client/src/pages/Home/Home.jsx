import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header3";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyProfile from "../My Profile/MyProfile";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [openDashboard, setOpenDashboard] = useState(true);
  const fetchData = async (user_id) => {
    const dataResponse = await axiosInstance.get(
      `${API_URLS.GET_USER_BY_ID}/${user_id}`
    );
    console.log(dataResponse);
    setUserData(dataResponse.data[0]);
  };
  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    console.log(user_id);
    
    fetchData(user_id);
  }, []);

  return (
    <div className="bg-gray-100 w-full ">
      <Header
        openDashboard={openDashboard}
        setOpenDashboard={setOpenDashboard}
      />
      <div className="pt-20 ">
        <Dashboard userData={userData} />
      </div>
    </div>
  );
};

export default Home;
