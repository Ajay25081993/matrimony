// import React, { useState, useEffect } from "react";
// import couple from "../../assets/kiss.png";
// import photo from "../../assets/photo.png";

// import astrology from "../../assets/astrology.png";
// import { Link, NavLink } from "react-router-dom";
// import Profile from "../../components/MyProfile Components/Profile";
// import About from "../../components/MyProfile Components/About";
// import BasicDetails from "../../components/MyProfile Components/BasicDetails";
// import ReligionInfo from "../../components/MyProfile Components/ReligionInfo";
// import LocationInfo from "../../components/MyProfile Components/LocationInfo";
// import ProfessionalInfo from "../../components/MyProfile Components/ProfessionalInfo";
// import HobbyIntersest from "../../components/MyProfile Components/HobbyIntersest";
// import FamilyInfo from "../../components/MyProfile Components/FamilyInfo";
// import PartnerInfo from "../../components/MyProfile Components/PartnerInfo";
// import axiosInstance from "../../lib/axios";
// import { API_URLS } from "../../constants/apiUrls";
// import Header from "../../components/Header/Header3";
// import Aboutfamily from "../../components/MyProfile Components/Aboutfamily";

// const MyProfile = () => {
//   const [openMyProfile, setOpenMyProfile] = useState(true);
//   const [viewMore, setViewMore] = useState(false);
//   const [userInfo, setUserInfo] = useState([]);
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const user_id = localStorage.getItem("user_id");

//     const fetchData = async (user_id) => {
//       try {
//         const dataResponse = await axiosInstance.get(
//           `${API_URLS.GET_USER_BY_ID}/${user_id}`
//         );
//         const infoResponse = await axiosInstance.get(
//           `${API_URLS.GET_INFO_BY_USER_ID}/${user_id}`
//         );
//         console.log(dataResponse);
//         console.log(infoResponse);

//         setUserInfo(infoResponse.data[0]);
//         setUserData(dataResponse.data[0]);
//       } catch (err) {
//         console.error("Failed to fetch user info:", err);
//       }
//     };

//     fetchData(user_id);
//   }, []);
//   return (
//     <div className=" w-full bg-blue-300 ">
//       <Header
//       profilePic={userData.profilePic}
//         openMyProfile={openMyProfile}
//         setOpenMyProfile={setOpenMyProfile}
//       />
//       <div className="w-full py-12 mt-22 flex  justify-center font-semibold gap-5">
//         {/* Left Side */}
//         <div className="w-3xl flex flex-col gap-4 ">
//           {/* Profile Picture */}
//           <Profile userData={userData} userInfo={userInfo} />

//           <div>
//             <p className="text-2xl text-green-400">Personal Information</p>
//             <div className="w-3xl h-[1px] bg-gray-400"></div>
//           </div>

//           {/* About Me */}
//           <About userInfo={userInfo} />

//           {/* Basic Details */}
//           <BasicDetails userData={userData} userInfo={userInfo} />

//           {/*Religion Information */}
//           <ReligionInfo userData={userData} userInfo={userInfo} />

//           {/* Location Information */}
//           <LocationInfo userData={userData} userInfo={userInfo} />

//           {/* Professional Information */}
//           <ProfessionalInfo userInfo={userInfo} />

//           {/* Family Details */}
//           <FamilyInfo userInfo={userInfo} />

//           {/* About My Family */}
//           <Aboutfamily />

//           {/* Hobbies and Interests */}
//           <HobbyIntersest />

//           {/* Partner Preferences */}
//           <PartnerInfo />
//         </div>

//         {/* Right Side */}
//         <div className=" space-y-5">
//           <div className="w-full border-l-4 border-t-4 border-r-1 border-b-1 border-gray-300 rounded-xl bg-gray-100 flex flex-col gap-5 px-2 py-3 ">
//             <div className="w-70 flex items-center gap-4">
//               <img src={couple} className="w-15" alt="" />
//               <p>
//                 <span className="text-xl font-normal">
//                   {" "}
//                   Add Partner <br /> Preferences
//                 </span>
//                 <br />
//                 To find your perfect match
//               </p>
//             </div>

//             <button className="hover:bg-amber-500 hover:text-white text-sky-500 text-xl border-1 border-red-200 bg-white font-normal py-1 rounded-sm cursor-pointer flex items-center justify-center">
//               Add Partner Preferences{" "}
//               <i className="ri-arrow-right-s-fill text-xl mt-1"></i>
//             </button>
//           </div>

//           {viewMore && (
//             <div className="w-full border-l-4 border-t-4 border-r-1 border-b-1 border-gray-300 rounded-xl bg-gray-100 flex flex-col gap-5 px-2 py-3 ">
//               <div className="w-70 flex items-center gap-4">
//                 <img src={astrology} className="w-15" alt="" />
//                 <p>
//                   <span className="text-xl font-normal"> Add Horoscope</span>
//                   <br />
//                   It is simple and absolutely FREE!
//                 </p>
//               </div>

//               <button className="hover:bg-amber-500 hover:text-white text-sky-500 text-xl border-1 border-red-200 bg-white font-normal py-1 rounded-sm cursor-pointer flex items-center justify-center">
//                 Add Horoscope{" "}
//                 <i className="ri-arrow-right-s-fill text-xl mt-1"></i>
//               </button>
//             </div>
//           )}

//           <div className="w-full border-l-4 border-t-4 border-r-1 border-b-1 border-gray-300 rounded-xl bg-gray-100 flex flex-col gap-5 px-2 py-3 ">
//             <div className="w-70 flex items-center gap-4">
//               <img src={photo} className="w-15" alt="" />
//               <p>
//                 <span className="text-xl font-normal"> Add More Photos</span>
//                 <br />
//                 Adding three or more photos might increase your chances of
//                 getting more responses.
//               </p>
//             </div>

//             <button className="hover:bg-amber-500 hover:text-white text-sky-500 text-xl border-1 border-red-200 bg-white font-normal py-1 rounded-sm cursor-pointer flex items-center justify-center">
//               Add More Photos{" "}
//               <i className="ri-arrow-right-s-fill text-xl mt-1"></i>
//             </button>
//           </div>

//           <div className="w-full  border-1 border-gray-300  bg-gray-100 flex flex-col gap-5 px-2 py-3 ">
//             <button
//               onClick={() => setViewMore(!viewMore)}
//               className="hover:bg-amber-500 hover:text-white text-sky-500 text-xl border-1 border-red-200 bg-white font-normal py-1 rounded-sm cursor-pointer flex items-center justify-center"
//             >
//               {" "}
//               {viewMore ? (
//                 <>
//                   <span>View Less</span>
//                   <i className="ri-arrow-up-s-fill "></i>
//                 </>
//               ) : (
//                 <>
//                   <span>View More</span>
//                   <i className="ri-arrow-down-s-fill "></i>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

import React, { useState, useEffect } from "react";
import AnimatedSection from "../../components/Animation/AnimatedSection";
import { API_URLS } from "../../constants/apiUrls";
import axiosInstance from "../../lib/axios";
import Header from "../../components/Header/Header3";
import couple from "../../assets/kiss.png";
import photo from "../../assets/photo.png";
import astrology from "../../assets/astrology.png";

// profile sub components
import Profile from "../../components/MyProfile Components/Profile";
import About from "../../components/MyProfile Components/About";
import BasicDetails from "../../components/MyProfile Components/BasicDetails";
import ReligionInfo from "../../components/MyProfile Components/ReligionInfo";
import LocationInfo from "../../components/MyProfile Components/LocationInfo";
import ProfessionalInfo from "../../components/MyProfile Components/ProfessionalInfo";
import HobbyIntersest from "../../components/MyProfile Components/HobbyIntersest";
import FamilyInfo from "../../components/MyProfile Components/FamilyInfo";
import PartnerInfo from "../../components/MyProfile Components/PartnerInfo";
import Aboutfamily from "../../components/MyProfile Components/Aboutfamily";

const MyProfile = () => {
  const [openMyProfile, setOpenMyProfile] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userData, setUserData] = useState([]);
  const [scrollDir, setScrollDir] = useState("down");

  // Detect scroll direction
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDir = () => {
      const currentY = window.pageYOffset;
      setScrollDir(currentY > lastScrollY ? "down" : "up");
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

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

  const infoCards = [
    {
      icon: couple,
      title: "Add Partner Preferences",
      subtitle: "To find your perfect match",
      button: "Add Partner Preferences",
    },
    viewMore && {
      icon: astrology,
      title: "Add Horoscope",
      subtitle: "It is simple and absolutely FREE!",
      button: "Add Horoscope",
    },
    {
      icon: photo,
      title: "Add More Photos",
      subtitle:
        "Adding three or more photos might increase your chances of getting more responses.",
      button: "Add More Photos",
    },
  ].filter(Boolean);

  return (
    <div className="w-full bg-[#d29bff53]">
      <Header
        userData={userData}
        profilePic={userData.profilePic}
        openMyProfile={openMyProfile}
        setOpenMyProfile={setOpenMyProfile}
      />

      <div className="w-full py-12 mt-22 flex justify-center font-semibold gap-5">
        <div className="w-3xl flex flex-col gap-4">
          {[
            <Profile userData={userData} userInfo={userInfo} />,
            <div>
              <p className="text-2xl text-green-400">Personal Information</p>
              <div className="w-3xl h-[1px] bg-gray-400"></div>
            </div>,
            <About userInfo={userInfo} />,
            <BasicDetails userData={userData} userInfo={userInfo} />,
            <ReligionInfo userData={userData} userInfo={userInfo} />,
            <LocationInfo userData={userData} userInfo={userInfo} />,
            <ProfessionalInfo userInfo={userInfo} />,
            <FamilyInfo userInfo={userInfo} />,
            <Aboutfamily />,
            <HobbyIntersest />,
            <PartnerInfo />,
          ].map((Component, idx) => (
            <AnimatedSection key={idx} direction={scrollDir}>
              {Component}
            </AnimatedSection>
          ))}
        </div>

        <div className="space-y-5">
          {infoCards.map((item, idx) => (
            <AnimatedSection key={idx} direction={scrollDir}>
              <div className="w-full border-l-4 border-t-4 border-gray-300 rounded-xl bg-gray-100 flex flex-col gap-5 px-2 py-3">
                <div className="w-70 flex items-center gap-4">
                  <img src={item.icon} className="w-15" alt="" />
                  <p>
                    <span className="text-xl font-normal">{item.title}</span>
                    <br />
                    {item.subtitle}
                  </p>
                </div>
                <button className="hover:bg-amber-500 hover:text-white text-sky-500 text-xl border border-red-200 bg-white font-normal py-1 rounded-sm cursor-pointer flex items-center justify-center">
                  {item.button}
                  <i className="ri-arrow-right-s-fill text-xl mt-1"></i>
                </button>
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection direction={scrollDir}>
            <div className="w-full border border-gray-300 bg-gray-100 flex flex-col gap-5 px-2 py-3">
              <button
                onClick={() => setViewMore(!viewMore)}
                className="hover:bg-amber-500 hover:text-white text-sky-500 text-xl border border-red-200 bg-white font-normal py-1 rounded-sm cursor-pointer flex items-center justify-center"
              >
                {viewMore ? (
                  <>
                    <span>View Less</span>
                    <i className="ri-arrow-up-s-fill"></i>
                  </>
                ) : (
                  <>
                    <span>View More</span>
                    <i className="ri-arrow-down-s-fill"></i>
                  </>
                )}
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
