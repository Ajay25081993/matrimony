import React, { useEffect, useState } from "react";
import Options from "../../components/Matches/Options";
import MatchedPerson from "../../components/Matches/MatchedPerson";
import Header from "../../components/Header/Header4";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import PhotoMatchedPerson from "../../components/Matches/PhotoMatchedPerson";
import ProfileWithHoroscope from "../../components/Matches/ProfileWithHoroscope";
import UserShortListed from "../../components/Matches/UserShortListed";
import ShortListedByOther from "../../components/Matches/ShortListedByOther";
import ViewedByU from "../../components/Matches/ViewedByU";
import ViewedBy from "../../components/Matches/ViewedBy";
import NewlyJoined from "../../components/Matches/Newlyjoined";
import NearByMatches from "../../components/Matches/NearByMatches";

const Matches = ({ steps }) => {
  const [userData, setUserData] = useState({});
  const [otherUserData, setOtherUserData] = useState([]);
  const allStep = [
    { component: MatchedPerson, path: "all-matches" },
    { component: UserShortListed, path: "shortlisted-by-you"},
    { component: ViewedBy, path: "viewed-you" },
    { component: ShortListedByOther, path: "shortlisted-you" },
    { component: ViewedByU, path: "viewed-by-you" },
    { component: NewlyJoined, path: "newly-joined" },
    { component: NearByMatches, path: "nearby-matches" },
    { component: PhotoMatchedPerson, path: "photo-matches" },
    { component: ProfileWithHoroscope, path: "profiles-with-horoscope" },
  ];


  const fetchData = async (user_id) => {
    try {
      const dataResponse = await axiosInstance.get(
        `${API_URLS.GET_USER_BY_ID}/${user_id}`
      );
      setUserData(dataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const fetchOtherUserData = async () => {
    try {
      const otherUserDataResponse = await axiosInstance.get(
        API_URLS.GET_USER_LIST,
        { params: {gender:userData.gender, user_id: userData.id } }
      );
      setOtherUserData(otherUserDataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch other user info:", err);
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    fetchData(user_id);
  }, []);

  useEffect(() => {
    if (userData.gender) {
      fetchOtherUserData();
    }
  }, [userData]);


  const CurrentComponent = allStep.find(
    (stepObj) => stepObj.path === steps
  )?.component;

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex justify-center gap-5 py-30">
        <Options />
        {CurrentComponent ? (
          <CurrentComponent otherUserData={otherUserData} loggedInUserData={userData}/>
        ) : null}
      </div>
    </div>
  );
};

export default Matches;
