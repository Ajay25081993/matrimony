import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { receivedSection, sentSection } from "./section";

const Sidebar = ({ receivedCounts, sentCounts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const openPage = (url) => {
    navigate(url);
  };

  return (
    <div className="bg-white w-60 p-4 border border-gray-300 space-y-4 shadow-sm  shadow-gray-400 rounded-md">
      {/* Interests Received */}
      <div className="space-y-4">
        <p
          className={` ${
            currentPath.startsWith("/interests/received") ? "font-bold" : ""
          }`}
        >
          Interests Received
        </p>
        <div className="space-y-2 text-sm font-semibold">
          {receivedSection.map((item) => (
            <div
              key={item.url}
              onClick={() => openPage(item.url)}
              className={`px-4 cursor-pointer ${
                currentPath === item.url ? "text-[#c419be]" : ""
              }`}
            >
              {item.title}{" "}
              {receivedCounts[item.url] > 0
                ? `(${receivedCounts[item.url]})`
                : ""}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-300 h-[1.5px]"></div>

      {/* Interests Sent */}
      <div className="space-y-4">
        <p
          className={` ${
            currentPath.startsWith("/interests/sent") ? "font-bold " : ""
          }`}
        >
          Interests Sent
        </p>

        <div className="space-y-2 text-sm font-semibold">
          {sentSection.map((item) => (
            <div
              key={item.url}
              onClick={() => openPage(item.url)}
              className={`px-4 cursor-pointer ${
                currentPath === item.url ? "text-[#c419be]" : ""
              }`}
            >
              {item.title}{" "}
              {sentCounts[item.url] > 0 ? `(${sentCounts[item.url]})` : ""}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-300 h-[1.5px]"></div>
    </div>
  );
};

export default Sidebar;
