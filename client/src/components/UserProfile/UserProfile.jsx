import React, { useEffect, useState } from "react";
import boyAvatar from "../../assets/Dp.png";
import design from "../../assets/design.svg";
import user from "../../assets/user.png";
import phone from "../../assets/phone.png";
import family from "../../assets/familyIcon.png";
import lifestyle from "../../assets/lifestyle.png";
import { calculateAge } from "../../components/MyProfile Components/ageCalculate";

import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";

const UserProfile = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [shortlist, setShortlist] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    const fetchData = async (user_id) => {
      try {
        const dataResponse = await axiosInstance.get(
          `${API_URLS.GET_USER_BY_ID}/${user_id}`
        );
        const infoResponse = await axiosInstance.get(
          `${API_URLS.GET_INFO_BY_USER_ID}/${user_id}`
        );
        console.log(dataResponse);
        console.log(infoResponse);

        setUserInfo(infoResponse.data[0]);
        setUserData(dataResponse.data[0]);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchData(user_id);
  }, []);
  const shorlistProfile = () => {
    setShortlist((prev) => !prev);
  };

  return (
    <div className="flex flex-col px-65 pt-30  gap-10 justify-center ">
      <div className="w-5xl shadow-md rounded-lg shadow-gray-500 py-4 px-5  flex gap-2 ">
        <div className="bg-gray-200 rounded-lg overflow-hidden  w-110 h-75">
          <img src={boyAvatar} className="object-cover w-full" alt="" />
        </div>

        <div className="w-full p-4 relative">
          <div className="flex justify-end items-center gap-2 text-gray-500 ">
            <div
              onClick={() => shorlistProfile()}
              className="bg-purple-100 px-2 rounded-full py-1 text-sm cursor-pointer"
            >
              {shortlist ? (
                <>
                  <i class="ri-heart-add-fill text-purple-500"></i> Shortlisted
                </>
              ) : (
                <>
                  <i class="ri-heart-add-line"></i> Shortlist
                </>
              )}
            </div>
            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              <i class="ri-more-2-fill"></i>
            </div>
          </div>

          <div
            className={`${
              openMenu ? "max-h-31 scale-3d" : "max-h-0 scale-95"
            } overflow-hidden  transition-all duration-300  bg-gray-50 shadow-sm shadow-gray-700 absolute right-5 top-18`}
          >
            <div className="space-x-1 px-2 pt-1 hover:bg-purple-100 cursor-pointer">
              <i class="ri-message-2-line"></i> <span>Send Message</span>
              <hr className=" text-gray-300 mt-2" />
            </div>
            <div className="space-x-1 px-2  hover:bg-purple-100 cursor-pointer">
              <i class="ri-prohibited-line"></i> <span>Block</span>
              <hr className="mt-2 text-gray-300" />
            </div>
            <div className="space-x-1 px-2 py-1 hover:bg-purple-100 cursor-pointer">
              <i class="ri-flag-line"></i> <span>Report</span>
            </div>
          </div>

          <div className="">
            <p className="font-bold">Sulogna das</p>{" "}
            <p className="text-gray-500 mb-5">Last seen Few hours ago </p>
            <div className="flex gap-2 flex-wrap ">
              <div>Never Married</div>
              <div className="text-purple-400">●</div>
              <div> Profile created by self</div>
              <div className="text-purple-400">●</div>
              <div>19 yrs</div>
              <div className="text-purple-400">●</div>
              <div>5'4"</div>
              <div className="text-purple-400">●</div>
              <div>Mahishya(Caste No Bar)</div>
              <div className="text-purple-400">●</div>
              <div>B.Com.</div>
              <div className="text-purple-400">●</div>
              <div>Student</div>
              <div className="text-purple-400">●</div>
              <div>Kolkata</div>
            </div>
          </div>

          <div className="mt-20 flex gap-2">
            <button className="border-1 hover:bg-gray-200 px-3 text-gray-700 border-gray-300 rounded-full cursor-pointer flex gap-2 items-center">
              <i className="ri-close-line text-xl mt-1 text-gray-500"></i>
              <span>Don't Show</span>
            </button>

            <button className="border-1 px-3 text-red-600 border-red-700 rounded-full cursor-pointer flex gap-2 items-center">
              <i className="ri-skip-forward-line text-xl mt-1 "></i>
              <span>Skip</span>
            </button>

            <button className=" px-6 rounded-full hover:bg-violet-600 text-white bg-violet-500 cursor-pointer flex gap-2 items-center">
              <i className="ri-heart-line text-xl mt-1 text-white"></i>
              <span>Send interset</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-4xl border-1 border-gray-300 rounded-xl p-5 space-y-4">
        {/* Personal Information */}
        <div className="flex items-center  gap-2 bg-purple-100 rounded-md px-3 py-2">
          <img src={user} alt="" className="w-10" />
          <p className="text-lg font-semibold">Personal Information</p>
        </div>
        <div className="flex gap-15 px-4">
          <div className="font-light space-y-4">
            <div>Age</div>
            <div> Height</div>
            <div>Spoken Languages </div>
            <div>Profile Created By</div>
            <div>Marital Status</div>
            <div>Lives In</div>
            <div>Eating Habits</div>
            <div>Religion</div>
            <div>Caste</div>
            <div>Gothra</div>
            <div>Date Of Birth</div>
            <div>Star</div>
            <div>Rassi</div>
            <div>Horoscope</div>
            <div>Employment</div>
            <div>Education</div>
            <div>Occupation</div>
            <div>Works At</div>
          </div>

          <div className="font-semibold space-y-4">
            <div>: {calculateAge(userData.dob)} Years</div>
            <div>: 5'8"</div>
            <div>: {userInfo.languageKnown}</div>
            <div>
              :{" "}
              {userData.createdFor?.endsWith("Self")
                ? "Self"
                : userData.createdFor}
            </div>
            <div>: {userInfo.maritalStatus}</div>
            <div>: {userInfo.eatingHabit}</div>
            <div>
              : {userInfo.city}, {userData.state}
            </div>
            <div>: {userData.religion}</div>
            <div>: {userInfo.subCommunity}</div>
            <div>: {userInfo.gothra}</div>
            <div>
              :{" "}
              <span className="text-orange-400 cursor-pointer text-sm">
                <i class="ri-lock-line"></i> Upgrade to view{" "}
                <i className="ri-arrow-right-s-line mt-1"></i>
              </span>{" "}
            </div>
            <div>
              :{" "}
              <span className="text-orange-400 cursor-pointer text-sm">
                <i class="ri-lock-line"></i> Upgrade to view{" "}
                <i className="ri-arrow-right-s-line mt-1"></i>
              </span>{" "}
            </div>
            <div>
              :{" "}
              <span className="text-orange-400 cursor-pointer text-sm">
                <i class="ri-lock-line"></i> Upgrade to view{" "}
                <i className="ri-arrow-right-s-line mt-1"></i>
              </span>{" "}
            </div>
            <div>
              :{" "}
              <span className="text-orange-400 cursor-pointer text-sm">
                <i class="ri-lock-line"></i> Upgrade to view{" "}
                <i className="ri-arrow-right-s-line mt-1"></i>
              </span>{" "}
            </div>
            <div>: {userInfo.workWith}</div>
            <div>: {userInfo.qualification}</div>
            <div>: {userInfo.workWith}</div>
            <div>
              :{" "}
              <span className="text-orange-400 cursor-pointer text-sm">
                <i class="ri-lock-line"></i> Upgrade to view{" "}
                <i className="ri-arrow-right-s-line mt-1"></i>
              </span>
            </div>
          </div>
        </div>
        {/* Family Information */}
        <div className="flex items-center  gap-2 bg-purple-100 rounded-md px-3 py-2">
          <img src={family} alt="" className="w-10" />
          <p className="text-lg font-semibold">Family Information</p>
        </div>
        <div className="flex gap-20 px-4">
          <div className="font-light space-y-4">
            <div>Parents</div>
            {userInfo.brother ? <div>Brother</div> : ""}
            {userInfo.sister ? <div>Sister</div> : ""}

            <div>Ancestral Origin</div>
          </div>

          <div className="font-semibold space-y-4">
            <div>
              : Father is a {userInfo.father}, Mother is a {userInfo.mother}
            </div>
            {userInfo.brother ? <div>: {userInfo.brother}</div> : ""}
            {userInfo.sister ? <div>: {userInfo.sister}</div> : ""}
            <div>: Not specified</div>
          </div>
        </div>
        {/* Contact Information */}
        <div className="flex items-center  gap-2 bg-purple-100 rounded-md px-3 py-2">
          <img src={phone} alt="" className="w-10" />
          <p className="text-lg font-semibold">Contact Information</p>
        </div>
        <div className="flex gap-20 px-4">
          <div className="font-light">
            <div>Mobile Number</div>
          </div>

          <div className="font-semibold">
            <div>
              :{" "}
              <span className="text-orange-400 cursor-pointer text-sm">
                <i class="ri-lock-line"></i>{" "}
                <span className="text-black">
                  +91 70<span className="text-xl">********</span>
                </span>{" "}
                Upgrade to view <i className="ri-arrow-right-s-line mt-1"></i>
              </span>
            </div>
          </div>
        </div>
        {/* About Myself */}
        <div className="flex items-center  gap-2 bg-purple-100 rounded-md px-3 py-2">
          <img src={user} alt="" className="w-10" />
          <p className="text-lg font-semibold">About Myself</p>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <h2 className="text-xl font-semibold">
            About {userData.firstName + " " + userData.lastName}
          </h2>
          <p>{userInfo.aboutMe}</p>
        </div>
        {/* Lifestyle */}
        <div className="flex items-center  gap-2 bg-purple-100 rounded-md px-3 py-2">
          <img src={lifestyle} alt="" className="w-10" />
          <p className="text-lg font-semibold">Lifestyle</p>
        </div>
        <div className="flex gap-20 px-4">
          <div className="font-light space-y-4">
            <div>Smoking Habits</div>
            <div>Drinking Habits</div>
          </div>
          <div className="font-semibold space-y-4">
            <div>: Doesn't Smoke</div>
            <div>: Doesn't Drink</div>
          </div>
        </div>
        {/* Partner Preferences */}
        {/* Basic Preferences */}
        <div className=" w-full text-lg font-semibold flex justify-center gap-4 p-6">
          <i class="ri-hearts-fill text-pink-300 -rotate-16"></i> Her Partner
          Preferences <i class="ri-hearts-fill text-pink-300 rotate-16"></i>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div className="bg-gradient-to-b from-purple-300 via-purple-200  to-white relative w-xl p-3 flex border-1 border-b-violet-300  justify-between border-violet-500 rounded-xl">
            <div className="w-20 h-20 overflow-hidden rounded-lg">
              <img src={boyAvatar} alt="" />
            </div>
            <div className="flex justify-center items-center text-lg font-semibold">
              You match 19/19 of her preferences
            </div>
            <div className="w-20 h-20 overflow-hidden rounded-lg">
              <img src={boyAvatar} alt="" />
            </div>
          </div>
        </div>

        <div className="flex items-center  gap-2 bg-purple-100  rounded-md px-3 py-2">
          <p className="text-lg font-semibold">Basic Preferences</p>
        </div>
        <div className="flex gap-20 px-40">
          <div className="font-light space-y-4">
            <div>
              Preferred{" "}
              {userData.gender === "Male" ? "Bride's Age" : "Groom's Age"}{" "}
            </div>
            <div>Preferred Height</div>
            <div>Preferred Marital Status</div>
            <div>Preferred Mother Tongue</div>
            <div>Preferred Physical Status</div>
            <div>Preferred Eating Habits</div>
            <div>Preferred Smoking Habits</div>
            <div>Preferred Drinking Habits</div>
          </div>
          <div className="font-semibold space-y-4">
            <div> 18-22 yrs</div>
            <div> 4'8" - 5'8"</div>
            <div> Never Married</div>
            <div> Bengali</div>
            <div> Normal </div>
            <div> Doesn't Matter</div>
            <div> Doesn't Matter</div>
            <div> Doesn't Matter</div>
          </div>

          <div className="space-y-3 text-2xl flex flex-col">
            <div className="h-7 flex items-center">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
          </div>
        </div>
        {/* Religious Preferences */}
        <div className="flex items-center  gap-2 bg-purple-100  rounded-md px-3 py-2">
          <p className="text-lg font-semibold">Religious Preferences</p>
        </div>
        <div className="flex gap-20 px-40">
          <div className="font-light space-y-4">
            <div>Preferred Religion</div>
            <div>Preferred Caste</div>
            <div>Preferred Star</div>
            <div>Preferred Dosham</div>
          </div>
          <div className="font-semibold ml-12 space-y-4">
            <div>Hindu</div>
            <div>Mahishya</div>
            <div>Any</div>
            <div>Doesn't Matter</div>
          </div>
          <div className="space-y-3 text-2xl flex flex-col">
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
          </div>
        </div>
        {/* Professional Preferences */}
        <div className="flex items-center  gap-2 bg-purple-100  rounded-md px-3 py-2">
          <p className="text-lg font-semibold">Professional Preferences</p>
        </div>
        <div className="flex gap-16 px-40">
          <div className="font-light space-y-4">
            <div>Preferred Education</div>
            <div>Preferred Employment Type</div>
            <div>Preferred Occupation</div>
            <div>Preferred Annual Income</div>
          </div>
          <div className="font-semibold space-y-4">
            <div>Bachelors more...</div>
            <div>Any</div>
            <div>Any</div>
            <div>Any</div>
          </div>
          <div className="space-y-3 text-2xl flex flex-col">
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center  gap-2 bg-purple-100 rounded-md px-3 py-2">
          <p className="text-lg font-semibold">Location Preferences</p>
        </div>
        <div className="flex gap-23 px-40">
          <div className="font-light space-y-4">
            <div>Preferred Country</div>
            <div>Preferred Residing State</div>
            <div>Preferred Residing City</div>
          </div>
          <div className="font-semibold space-y-4">
            <div>India</div>
            <div>West Bengal</div>
            <div>Any</div>
          </div>
          <div className="space-y-3 text-2xl flex flex-col">
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
            <div className="flex items-center  h-7">
              <i className="ri-checkbox-circle-line text-green-300"></i>
            </div>
          </div>
        </div>

        <div className="flex items-center  bg-purple-100 rounded-md px-3 py-2">
          <i class="ri-hearts-fill text-pink-300 text-xl -rotate-30"></i>{" "}
          <i class="ri-hearts-fill text-pink-300 text-xl rotate-30 mr-2"></i>{" "}
          <p className="text-lg font-semibold"> Both of you like</p>
        </div>

        <div className="flex gap-5 px-4">
          <div>Hobby</div>
          <div>: Cooking</div>
        </div>

        <div className="flex items-center justify-center  px-3 py-4">
          <img src={design} className="w-500" alt="" />
        </div>

        <div className="space-y-4 mt-5">
          <div className="flex w-full justify-between">
            <p className="text-lg font-semibold">Profiles you may like</p>
            <span className="text-violet-600 cursor-pointer">
              See all <i className="ri-arrow-right-s-line text-lg"></i>
            </span>
          </div>
          <div className="flex gap-4">
            <div className="bg-amber-300 w-40 h-40 rounded-lg overflow-hidden relative">
              <img src={boyAvatar} className="object-cover w-full" alt="" />
              <div className="absolute bottom-0 left-0 right-0 text-sm text-white font-semibold bg-[#0000002d]  px-2">
                <p>Rudradeb Maji</p>
                <p>22 Yrs, 5'3"</p>
              </div>
            </div>
            <div className="bg-amber-300 w-40 h-40 rounded-lg overflow-hidden relative">
              <img src={boyAvatar} className="object-cover w-full" alt="" />
              <div className="absolute bottom-0 left-0 right-0 text-sm text-white font-semibold bg-[#0000002d]  px-2">
                <p>Rudradeb Maji</p>
                <p>22 Yrs, 5'3"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
