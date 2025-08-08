import React, { useEffect, useState } from "react";
import EditMail from "../Rightsidecomponents/Editmail";
import ChangingPassword from "../Rightsidecomponents/ChangingPassword";
import Alerts from "../Rightsidecomponents/Alerts";
import ProfileSetting from "../Rightsidecomponents/ProfileSetting";
import CallPreference from "../Rightsidecomponents/CallPreference";
import DeleteProfile from "../Rightsidecomponents/DeleteProfile";
import DeactivateProfile from "../Rightsidecomponents/DeactivateProfile";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
const RightSide = ({
  editEmail,
  changingPassword,
  alerts,
  callPreference,
  deleteProfile,
  deactivateProfile,
  profileSetting,
}) => {
  const user_id = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
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
    <div className="w-3xl  text-left  rounded p-3">
      <div className="">
        {editEmail && <EditMail loggedInUserData={userData} fetchData={fetchData}/>}
        {changingPassword && <ChangingPassword />}
        {alerts && <Alerts />}
        {callPreference && <CallPreference />}
        {profileSetting && <ProfileSetting />}
        {deactivateProfile && <DeactivateProfile />}
        {deleteProfile && <DeleteProfile />}
      </div>
    </div>
  );
};

export default RightSide;
