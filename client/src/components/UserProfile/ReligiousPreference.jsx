import React, { useState } from "react";

const ReligiousPreference = ({
  userPreference,
  loggedInUserInfo,
  religion,
  setReligiousCount,
}) => {
  const [expandedField, setExpandedField] = useState(null);

  const handleToggle = (field) => {
    setExpandedField(expandedField === field ? null : field);
  };

  const starsArray = userPreference.star
    ? userPreference.star.split("|").filter((item) => item)
    : [];

  const rashiArray = userPreference.rashi
    ? userPreference.rashi.split("|").filter((item) => item)
    : [];

  // ✅ Helper to show match icon
  const isMatched = (preferenceValue, userValue) =>
    preferenceValue && userValue && preferenceValue.includes(userValue)
      ? "text-green-300"
      : "text-gray-300";

  const renderValues = (array, field) => {
    if (array.length === 0) return <span>-</span>;

    if (expandedField === field || array.length <= 2) {
      return (
        <>
          {array.map((item, index) => (
            <span key={index} className="text-sm mr-1 font-semibold">
              {item}
              {index !== array.length - 1 && ","}
            </span>
          ))}
          {array.length > 2 && (
            <button
              onClick={() => handleToggle(field)}
              className="text-blue-500 text-sm ml-2 font-semibold cursor-pointer"
            >
              Show less
            </button>
          )}
        </>
      );
    } else {
      return (
        <>
          {array.slice(0, 2).map((item, index) => (
            <span key={index} className="text-sm mr-1 font-semibold">
              {item}
              {index !== 1 && ","}
            </span>
          ))}
          {array.length > 2 && (
            <button
              onClick={() => handleToggle(field)}
              className="text-blue-500 text-sm ml-1 font-semibold cursor-pointer"
            >
              ... more
            </button>
          )}
        </>
      );
    }
  };

  let matchCount = 0;

    if (userPreference.religion && userPreference.religion.includes(religion)) matchCount++;

    if (userPreference.caste && userPreference.caste.includes(loggedInUserInfo.subCommunity))
      matchCount++;

    if (rashiArray.includes(loggedInUserInfo.rashi)) matchCount++;

    if (starsArray.includes(loggedInUserInfo.star)) matchCount++;

    setReligiousCount( matchCount);

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center gap-2 bg-purple-100 rounded-md px-3 py-2">
        <p className="text-lg font-semibold">Religious Preferences</p>
      </div>

      <div className="flex flex-col justify-center items-center space-y-3">
        {/* Religion */}
        <div className="flex w-xl space-x-9">
          <p className="w-60 px-2 py-1">Preferred Religion</p>
          <p className="w-60 px-2 py-1">{userPreference.religion}</p>
          <div className="flex items-center justify-center w-12 text-2xl">
            <i
              className={`ri-checkbox-circle-line ${isMatched(
                userPreference.religion,
                religion
              )}`}
            ></i>
          </div>
        </div>

        {/* Caste */}
        <div className="flex w-xl space-x-9">
          <p className="w-60 px-2 py-1">Preferred Caste</p>
          <p className="w-60 px-2 py-1">{userPreference.caste}</p>
          <div className="flex items-center justify-center w-12 text-2xl">
            <i
              className={`ri-checkbox-circle-line ${isMatched(
                userPreference.caste,
                loggedInUserInfo.subCommunity
              )}`}
            ></i>
          </div>
        </div>

        {/* Rashi */}
        <div className="flex w-xl space-x-9">
          <p className="w-60 px-2 py-1">Preferred Rashi</p>
          <div className="w-60 px-2 py-1 flex flex-wrap">
            {renderValues(rashiArray, "rashi")}
          </div>
          <div className="flex items-center justify-center w-12 text-2xl">
            <i
              className={`ri-checkbox-circle-line ${
                rashiArray.includes(loggedInUserInfo.rashi)
                  ? "text-green-300"
                  : "text-gray-300"
              }`}
            ></i>
          </div>
        </div>

        {/* Star */}
        <div className="flex w-xl space-x-9">
          <p className="w-60 px-2 py-1">Preferred Star</p>
          <div className="w-60 px-2 py-1 flex flex-wrap">
            {renderValues(starsArray, "star")}
          </div>
          <div className="flex items-center justify-center w-12 text-2xl">
            <i
              className={`ri-checkbox-circle-line ${
                starsArray.includes(loggedInUserInfo.star)
                  ? "text-green-300"
                  : "text-gray-300"
              }`}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReligiousPreference;
