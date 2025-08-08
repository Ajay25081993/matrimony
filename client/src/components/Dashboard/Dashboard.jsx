import React, { useEffect, useState } from "react";
import hs from "../../assets/horoscope.png";
import vf from "../../assets/verified.png";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { Link, useNavigate } from "react-router-dom";
import SuccessStory2 from "../Success/SuccesStory2";

const Dashboard = ({ userData }) => {
  const [otherUserData, setOtherUserData] = useState([]);
  const [likedUserData, setLikedUserData] = useState([]);
  const navigateTo = useNavigate();
  const openProfile = (id) => {
    navigateTo(`/matches/all-matches/${id}`);
  };
  const fetchOtherUserData = async () => {
    try {
      const otherUserDataResponse = await axiosInstance.get(
        API_URLS.GET_USER_LIST,
        { params: { gender: userData.gender, user_id: userData.id } }
      );
      setOtherUserData(otherUserDataResponse.data[0]);
    } catch (err) {
      console.error("Failed to fetch other user info:", err);
    }
  };
  const fetchLikes = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_URLS.GET_LIKED_USER}/${userData.id}`
      );
      console.log(response.data);

      setLikedUserData(response.data);
    } catch (err) {
      console.error("Failed to fetch likes:", err);
    }
  };

  useEffect(() => {
    if (userData.gender) {
      fetchOtherUserData();
    }
  }, [userData]);

  useEffect(() => {
    if (userData.id) {
      fetchLikes();
    }
  }, [userData]);
  return (
    <div className=" flex bg-gray-100 py-6 justify-center gap-5 w-full mt-8">
      <div className="bg-white border-1 border-gray-300 rounded-md w-60 text-gray-500 space-y-2 h-105">
        <div className="w-60 h-60 overflow-hidden rounded-t-md">
          <img
            src={userData.profilePic}
            className="w-full object-cover"
            alt=""
          />
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
            {userData.createdAt && (
              <p className="text-sm">
                Valid till{" "}
                {new Date(
                  new Date(userData.createdAt).setFullYear(
                    new Date(userData.createdAt).getFullYear() + 1
                  )
                ).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>
          <i class="ri-verified-badge-fill text-cyan-300 text-3xl"></i>
        </div>
      </div>

      <div className=" space-y-4 w-190">
        {/* <div className="space-y-2 ">
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
        </div> */}

        <div className="space-y-3 w-110">
          <p>Improve Your Profile</p>
          <div className="flex justify-between border-1 border-gray-300 rounded-md p-4">
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

        <div className="px-5 py-6 w-full  space-y-2 border-t-4 border-purple-200">
          <div>
            <p className="text-xl font-semibold">
              All Matches ( {otherUserData.length} )
            </p>
            <p className="text-md">
              Members who match your partner preferences
            </p>
          </div>
          <div className="flex space-y-2">
            {otherUserData.map((user, index) => {
              return (
                <div onClick={() => openProfile(user.id)} key={index} className="cursor-pointer">
                  <div className="w-35 h-35 rounded-lg overflow-hidden">
                    <img
                      src={user.profilePic}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {user.firstName} {user.lastName}, {user.Info.height}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center">
            <Link to={"/matches/all-matches"}>
              {" "}
              <button className="cursor-pointer font-semibold px-20 py-1  border bg-purple-200 border-purple-500 text-purple-700 hover:bg-purple-300 rounded-full">
                View All{" "}
                <i class="text-lg font-semibold ri-arrow-right-s-line"></i>
              </button>
            </Link>
          </div>
        </div>

        <div className="px-5 py-6 w-full space-y-2 border-t-4 border-purple-200">
          <div>
            <p className="text-xl font-semibold">
              Who Viewed You ( {otherUserData.length} )
            </p>
            <p className="text-md">Members who have viewed your profile</p>
          </div>
          <div className="flex space-y-2">
            {otherUserData.map((user, index) => {
              return (
                <div
                className="cursor-pointer"
                onClick={()=>openProfile(user.id)}
                key={index}>
                  <div className="w-35 h-35 rounded-lg overflow-hidden">
                    <img
                      src={user.profilePic}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {user.firstName} {user.lastName}, {user.Info.height}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center">
            <Link to={"/matches/all-matches"}>
              {" "}
              <button className="cursor-pointer font-semibold px-20 py-1  border bg-purple-200 border-purple-500 text-purple-700 hover:bg-purple-300 rounded-full">
                View All{" "}
                <i class="text-lg font-semibold ri-arrow-right-s-line"></i>
              </button>
            </Link>
          </div>
        </div>

        <div className="px-5 py-6 w-full space-y-2 border-t-4 border-purple-200">
          <div>
            <p className="text-xl font-semibold">
              Profiles You Liked ( {likedUserData.length} )
            </p>
            <p className="text-md">Members that you have liked</p>
          </div>
          <div className="flex space-y-2">
            {likedUserData.map((user, index) => {
              return (
                <div
                className="cursor-pointer"
                onClick={()=>openProfile(user.likedUser.id)}
                key={index}>
                  <div className="w-50 h-50 rounded-lg overflow-hidden">
                    <img
                      src={user.likedUser.profilePic}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {user.likedUser.firstName} {user.likedUser.lastName},{" "}
                    {user.likedUserInfo.height}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center">
            <Link to={"/matches/all-matches"}>
              {" "}
              <button className="cursor-pointer font-semibold px-20 py-1  border bg-purple-200 border-purple-500 text-purple-700 hover:bg-purple-300 rounded-full">
                View All{" "}
                <i class="text-lg font-semibold ri-arrow-right-s-line"></i>
              </button>
            </Link>
          </div>
        </div>

        <div className="px-5 py-6 w-full space-y-2 border-t-4 border-b-4 border-purple-200">
          <div>
            <p className="text-xl font-semibold">
              Profiles You Viewed ( {otherUserData.length} )
            </p>
            <p className="text-md">Members that you have viewed</p>
          </div>
          <div className="flex space-y-2">
            {otherUserData.map((user, index) => {
              return (
                <div className="cursor-pointer"
                onClick={()=>openProfile(user.id)} key={index}>
                  <div className="w-35 h-35 rounded-lg overflow-hidden">
                    <img
                      src={user.profilePic}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {user.firstName} {user.lastName}, {user.Info.height}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center">
            <Link to={"/matches/all-matches"}>
              {" "}
              <button className="cursor-pointer font-semibold px-20 py-1  border bg-purple-200 border-purple-500 text-purple-700 hover:bg-purple-300 rounded-full">
                View All{" "}
                <i class="text-lg font-semibold ri-arrow-right-s-line"></i>
              </button>
            </Link>
          </div>
        </div>

        <div className="px-15 mt-4 py-6  w-full space-y-3  bg-purple-100 rounded-lg">
          <div>
            <p className="text-xl font-semibold text-center">
              Our Success Stories
            </p>
            <p className="text-md text-center">
              Lakhs of Souls Found their Hidden Treasure
            </p>
          </div>
          <div className="">
            <SuccessStory2 />
          </div>

          <div className="w-full flex justify-center">
            <Link to={"/matches/all-matches"}>
              {" "}
              <button className="cursor-pointer font-semibold px-20 py-1  border bg-purple-200 border-purple-500 text-purple-700 hover:bg-purple-300 rounded-full">
                View Success Stories{" "}
                <i class="text-lg font-semibold ri-arrow-right-s-line"></i>
              </button>
            </Link>
          </div>
        </div>

        <div className="border border-gray-300 w-full p-5 rounded-lg flex items-center justify-between">
          <p className="text-xl font-semibold">
            Profiles You Marked As “Don't show” (2)
          </p>
          <div className="flex relative">
            <div className="w-15 h-15 overflow-hidden">
              <img src={vf} alt="" className="w-full object-cover" />
            </div>
            <div className="w-15 h-15 overflow-hidden absolute left-8">
              <img src={vf} alt="" className="w-full object-cover" />
            </div>
          </div>
          <div className="flex justify-center">
            <Link to={"/matches/all-matches"}>
              {" "}
              <button className="cursor-pointer font-semibold px-5 py-1  border bg-purple-200 border-purple-500 text-purple-700 hover:bg-purple-300 rounded-full">
                View All{" "}
                <i class="text-lg font-semibold ri-arrow-right-s-line"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
