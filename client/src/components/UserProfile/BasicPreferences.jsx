import React, { useState } from "react";
import { useEffect } from "react";

const BasicPreferences = ({
  userPreference,
  loggedInUserInfo,
  age,
  setBasicCount,
}) => {
  const [expanded, setExpanded] = useState({
    mother_tongue: false,
    marital_status: false,
    eating_habits: false,
    smoking_habits: false,
    drinking_habits: false,
  });

  const toggleExpand = (field) => {
    setExpanded((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const parseNumber = (numberString) => {
    if (!numberString) return 0;
    return parseFloat(numberString.replace(" ft", ""));
  };

  const checkDigitMatch = (digitStr, minDigitStr, maxDigitStr) => {
    const digit = parseNumber(digitStr);
    const minDigit = parseNumber(minDigitStr);
    const maxDigit = parseNumber(maxDigitStr);

    // If any of the values are invalid, consider it unmatched
    if (!digit || !minDigit || !maxDigit) {
      return false;
    }

    return digit >= minDigit && digit <= maxDigit;
  };

  const isMatched = (preferenceString, userValue) =>
    preferenceString?.split("|").includes(userValue);

  const renderExpandableText = (fieldValue, fieldKey) => {
    if (!fieldValue) return "";

    const values = fieldValue.split("|");
    if (values.length <= 2) return values.join(",");

    if (expanded[fieldKey]) {
      return (
        <>
          {values.join(", ")}{" "}
          <span
            onClick={() => toggleExpand(fieldKey)}
            className="text-blue-500 cursor-pointer"
          >
            less
          </span>
        </>
      );
    } else {
      return (
        <>
          {values.slice(0, 2).join(", ")}{" "}
          <span
            onClick={() => toggleExpand(fieldKey)}
            className="text-blue-500 cursor-pointer"
          >
            ...more
          </span>
        </>
      );
    }
  };

  
  let matchCount = 0;

  const ageMatched = checkDigitMatch(
    age,
    userPreference.age_from,
    userPreference.age_to
  );
  if (ageMatched) matchCount++;

  const heightMatched = checkDigitMatch(
    loggedInUserInfo.height,
    userPreference.height_from,
    userPreference.height_to
  );
  if (heightMatched) matchCount++;

  const maritalMatched = isMatched(
    userPreference.marital_status,
    loggedInUserInfo.maritalStatus
  );
  if (maritalMatched) matchCount++;

  const motherTongueMatched =
    userPreference.mother_tongue &&
    userPreference.mother_tongue
      .split("|")
      .some((lang) => loggedInUserInfo.languageKnown.split(" ").includes(lang));
  if (motherTongueMatched) matchCount++;

  const physicalMatched =
    userPreference.physical_status === loggedInUserInfo.physicalStatus;
  if (physicalMatched) matchCount++;

  const eatingMatched = isMatched(
    userPreference.eating_habits,
    loggedInUserInfo.diet
  );
  if (eatingMatched) matchCount++;

  const smokingMatched = isMatched(
    userPreference.smoking_habits,
    loggedInUserInfo.smokingHabit
  );
  if (smokingMatched) matchCount++;

  const drinkingMatched = isMatched(
    userPreference.drinking_habits,
    loggedInUserInfo.drinkingHabit
  );
  if (drinkingMatched) matchCount++;


  
 setBasicCount(matchCount);

  return (
    <div className="flex flex-col justify-center items-center space-y-3  rounded-lg">
      <div className="flex w-full items-center  bg-purple-100  rounded-md px-3 py-2">
        <div className="flex space-x-113 w-full">
          <p className="text-lg font-semibold">Basic Preferences</p>{" "}
          <p className="text-sm font-semibold">
            You match{" "}
            <span>
              {" "}
              <i className="ri-checkbox-circle-line text-xl text-green-400"></i>
            </span>
          </p>
        </div>
      </div>

      {/* Age */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Age</p>
        <p className="w-60 px-2 py-1">
          {userPreference.age_from} - {userPreference.age_to}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          {checkDigitMatch(
            age,
            userPreference.age_from,
            userPreference.age_to
          ) ? (
            <i className="ri-checkbox-circle-line text-green-300"></i>
          ) : (
            <i className="ri-checkbox-circle-line text-gray-400"></i>
          )}
        </div>
      </div>

      {/* Height */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Height</p>
        <p className="w-60 px-2 py-1">
          {userPreference.height_from} - {userPreference.height_to}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          {checkDigitMatch(
            loggedInUserInfo.height,
            userPreference.height_from,
            userPreference.height_to
          ) ? (
            <i className="ri-checkbox-circle-line text-green-300"></i>
          ) : (
            <i className="ri-checkbox-circle-line text-gray-400"></i>
          )}
        </div>
      </div>

      {/* Marital Status */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Marital Status</p>
        <p className="w-60 px-2 py-1">
          {renderExpandableText(
            userPreference.marital_status,
            "marital_status"
          )}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          {isMatched(
            userPreference.marital_status,
            loggedInUserInfo.maritalStatus
          ) ? (
            <i className="ri-checkbox-circle-line text-green-300"></i>
          ) : (
            <i className="ri-checkbox-circle-line text-gray-400"></i>
          )}
        </div>
      </div>

      {/* Mother Tongue */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Mother Tongue</p>
        <p className="w-60 px-2 py-1">
          {renderExpandableText(userPreference.mother_tongue, "mother_tongue")}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl gap-1 flex-wrap">
          {userPreference.mother_tongue &&
            (userPreference.mother_tongue
              .split("|")
              .some((lang) =>
                loggedInUserInfo.languageKnown.split(" ").includes(lang)
              ) ? (
              <i className="ri-checkbox-circle-line text-green-300"></i>
            ) : (
              <i className="ri-checkbox-circle-line text-gray-400"></i>
            ))}
        </div>
      </div>

      {/* Physical Status */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Physical Status</p>
        <p className="w-60 px-2 py-1">{userPreference.physical_status}</p>
        <div className="flex items-center justify-center w-12 text-2xl gap-1 flex-wrap">
          {userPreference.physical_status ===
          loggedInUserInfo.physicalStatus ? (
            <i className="ri-checkbox-circle-line text-green-300"></i>
          ) : (
            <i className="ri-checkbox-circle-line text-gray-400"></i>
          )}
        </div>
      </div>

      {/* Eating Habits */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Eating Habits</p>
        <p className="w-60 px-2 py-1">
          {renderExpandableText(userPreference.eating_habits, "eating_habits")}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          {isMatched(userPreference.eating_habits, loggedInUserInfo.diet) ? (
            <i className="ri-checkbox-circle-line text-green-300"></i>
          ) : (
            <i className="ri-checkbox-circle-line text-gray-400"></i>
          )}
        </div>
      </div>

      {/* Smoking Habits */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Smoking Habits</p>
        <p className="w-60 px-2 py-1">
          {renderExpandableText(
            userPreference.smoking_habits,
            "smoking_habits"
          )}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          {isMatched(
            userPreference.smoking_habits,
            loggedInUserInfo.smokingHabit
          ) ? (
            <i className="ri-checkbox-circle-line text-green-300"></i>
          ) : (
            <i className="ri-checkbox-circle-line text-gray-400"></i>
          )}
        </div>
      </div>

      {/* Drinking Habits */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Drinking Habits</p>
        <p className="w-60 px-2 py-1">
          {renderExpandableText(
            userPreference.drinking_habits,
            "drinking_habits"
          )}
        </p>
        <div className="flex items-center justify-center w-12 text-2xl">
          {isMatched(
            userPreference.drinking_habits,
            loggedInUserInfo.drinkingHabit
          ) ? (
            <i className="ri-checkbox-circle-line text-green-300"></i>
          ) : (
            <i className="ri-checkbox-circle-line text-gray-400"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicPreferences;
