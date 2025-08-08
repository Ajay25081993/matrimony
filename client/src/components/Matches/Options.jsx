import React from "react";
import {
  activity,
  matchesOnPreference,
  mutualmatches,
  nearByMatches,
  profileDetails,
} from "./profileMatchOption";
import { useNavigate, useLocation } from "react-router-dom";

// Reusable Match List Section Component
const MatchSection = ({ title, data, currentPath, openPage }) => {
  return (
    <div>
      <p className="text-lg font-semibold px-3 py-1">{title}</p>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => {
                console.log(item.url);
                console.log(currentPath);
                openPage(item.url);
              }}
              className={`flex justify-between p-3 cursor-pointer hover:bg-[#ff06f75d] ${
                currentPath === item.url
                  ? "bg-gradient-to-r from-[#f000dc] via-[#bf11b9] to-[#9f139a] text-white"
                  : ""
              }`}
            >
              <div className="flex gap-2 items-start">
                <i className={`${item.icon} text-lg`}></i>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs">{item.subtitle}</p>
                </div>
              </div>
              <i className="ri-arrow-right-s-line text-xl"></i>
            </div>
            <div className={`bg-gray-200 h-[0.5px] ml-6 w-65`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Options = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const openPage = (url) => {
    navigate(url);
  };

  return (
    <div className="border-1 border-gray-300 rounded-sm w-80 h-180 overflow-scroll">
      <div>
        <p className="text-lg font-semibold p-3">All Matches</p>
        <div
          onClick={() => openPage("/matches/all-matches")}
          className={`flex justify-between p-3 cursor-pointer hover:bg-[#ff06f75d] ${
            location.pathname === "/matches/all-matches"
              ? "bg-gradient-to-r from-[#f000dc] via-[#bf11b9] to-[#9f139a] text-white"
              : ""
          }`}
        >
          <div className="flex gap-2">
            <i className="ri-file-user-line text-lg"></i>
            <div>
              <p className="font-semibold">Your matches</p>
              <p className="text-xs">
                View all the profiles that match your preferences
              </p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-xl"></i>
        </div>
        <div className="bg-gray-200 h-[0.5px] ml-6 w-65"></div>
      </div>

      {/* Reusable Match Sections */}
      <MatchSection
        title="Based on activity"
        data={activity}
        currentPath={location.pathname}
        openPage={openPage}
      />

      <MatchSection
        title="Recently joined & nearby matches"
        data={nearByMatches}
        currentPath={location.pathname}
        openPage={openPage}
      />

      <MatchSection
        title="Based on profile details"
        data={profileDetails}
        currentPath={location.pathname}
        openPage={openPage}
      />

      <MatchSection
        title="Members who are looking for someone like you"
        data={mutualmatches}
        currentPath={location.pathname}
        openPage={openPage}
      />

      <MatchSection
        title="Matches based on preference"
        data={matchesOnPreference}
        currentPath={location.pathname}
        openPage={openPage}
      />

      {/* <div>
        <p className="text-lg font-semibold px-3 py-1">Other Matches</p>
        <div
          onClick={() => openPage("/matches/assisted")}
          className={`flex justify-between p-3 cursor-pointer hover:bg-purple-200 ${
            location.pathname === "/matches/assisted"
              ? "bg-gradient-to-r from-violet-500 via-purple-600 to-pink-500 text-white"
              : ""
          }`}
        >
          <div className="flex gap-2">
            <i className="ri-graduation-cap-line text-lg"></i>
            <div>
              <p className="font-semibold">Assisted matches</p>
              <p className="text-xs">
                Matches based on your preferred education
              </p>
            </div>
          </div>
          <i className="ri-arrow-right-s-line text-xl"></i>
        </div>
        <div className="bg-gray-200 h-[0.5px] ml-6 w-65"></div>
      </div> */}
    </div>
  );
};

export default Options;
