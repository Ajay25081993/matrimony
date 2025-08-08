import React, { useState } from "react";

const LocationPreferences = ({
  userPreference,
  loggedInUserInfo,
  state,
  setLocationCount,
}) => {
  const [expandedField, setExpandedField] = useState(null);

  const handleToggle = (field) => {
    setExpandedField(expandedField === field ? null : field);
  };

  const renderValues = (value, field) => {
    if (!value) return "Any";

    const valuesArray = value.split("|");

    if (valuesArray.length <= 2 || expandedField === field) {
      return (
        <>
          {valuesArray.join(", ")}{" "}
          {valuesArray.length > 2 && (
            <button
              onClick={() => handleToggle(field)}
              className="text-blue-500 text-sm ml-1"
            >
              Show less
            </button>
          )}
        </>
      );
    }

    return (
      <>
        {valuesArray.slice(0, 2).join(", ")}
        <button
          onClick={() => handleToggle(field)}
          className="text-blue-500 text-sm ml-1"
        >
          ...more
        </button>
      </>
    );
  };

  const isMatched = (prefString, userValue) => {
    if (!userValue || !prefString) return false;
    const prefArray = prefString.split("|").map((item) => item.trim());
    return prefArray.includes(userValue);
  };

  const MatchIcon = ({ matched }) => (
    <i
      className={`ri-checkbox-circle-line ${
        matched ? "text-green-300" : "text-gray-300"
      }`}
    />
  );

  let matchCount = 0;

  if (isMatched(userPreference.residing_states, state)) matchCount++;
  if (isMatched(userPreference.residing_cities, loggedInUserInfo.city))
    matchCount++;
  setLocationCount(matchCount);

  return (
    <div className="flex flex-col justify-center items-center space-y-3 rounded-lg">
      {/* Title */}
      <div className="flex items-center gap-2 bg-purple-100 rounded-md px-3 py-2 w-full">
        <p className="text-lg font-semibold">Location Preferences</p>
      </div>

      {/* Residing State */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Residing State</p>
        <p className="w-60 px-2 py-1">
          {renderValues(userPreference.residing_states, "state")}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          <MatchIcon
            matched={isMatched(userPreference.residing_states, state)}
          />
        </div>
      </div>

      {/* Residing City */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Residing City</p>
        <p className="w-60 px-2 py-1">
          {renderValues(userPreference.residing_cities, "city")}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          <MatchIcon
            matched={isMatched(
              userPreference.residing_cities,
              loggedInUserInfo.city
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationPreferences;
