import React, { useState } from "react";
// Category mapping for education (can expand this for work_as, work_in, etc if needed)
const educationCategoryMap = {
  "B.A": "Bachelor's - Arts / Science / Commerce",
  "B.Com": "Bachelor's - Arts / Science / Commerce",
  "B.Sc": "Bachelor's - Arts / Science / Commerce",
  "M.A": "Master's - Arts / Science / Commerce",
  "M.Com": "Master's - Arts / Science / Commerce",
  "M.Sc": "Master's - Arts / Science / Commerce",
  "B.Tech": "Bachelor's - Engineering / Computer Science",
  "B.E": "Bachelor's - Engineering / Computer Science",
  "M.Tech": "Master's - Engineering / Computer Science",
  "M.E": "Master's - Engineering / Computer Science",
};

const ProfessionalPreference = ({
  userPreference,
  loggedInUserInfo,
  setProfessionalCount,
}) => {
  const [showFullFields, setShowFullFields] = useState({
    education: false,
    work_in: false,
    work_as: false,
    income: false,
  });

  const toggleShowFull = (field) => {
    setShowFullFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderField = (arrayString, showFull, toggle) => {
    if (!arrayString) return "Any";

    const array = arrayString.split("|").filter((item) => item);

    if (array.length === 0) return "Any";

    return (
      <div className="flex flex-wrap font-semibold">
        {showFull
          ? array.map((item, index) => (
              <span key={index} className="text-sm mr-1">
                {item}
                {index !== array.length - 1 && ","}
              </span>
            ))
          : array.slice(0, 2).map((item, index) => (
              <span key={index} className="text-sm mr-1">
                {item}
                {index !== 1 && array.length > 1 && ","}
              </span>
            ))}

        {array.length > 2 && (
          <button
            onClick={toggle}
            className="text-blue-500 text-xs ml-1 focus:outline-none"
          >
            {showFull ? "Show less" : "...more"}
          </button>
        )}
      </div>
    );
  };

  // Generalized matching for simple fields
  const isMatched = (prefString, userValue) => {
    if (!userValue || !prefString) return false;
    const prefArray = prefString.split("|").map((item) => item.trim());
    return prefArray.includes(userValue);
  };

  // Special matching logic for education with category mapping
  const isEducationMatched = (prefString, userQualification) => {
    if (!userQualification) return false;

    const userCategory = educationCategoryMap[userQualification];
    if (!userCategory) return false;

    const prefArray = prefString?.split("|").map((item) => item.trim()) || [];
    return prefArray.includes(userCategory);
  };

  const MatchIcon = ({ matched }) => (
    <i
      className={`ri-checkbox-circle-line ${
        matched ? "text-green-300" : "text-gray-300"
      }`}
    />
  );

  let matchCount = 0;

  if (
    isEducationMatched(userPreference.education, loggedInUserInfo.qualification)
  )
    matchCount++;
  if (isMatched(userPreference.work_in, loggedInUserInfo.workWith))
    matchCount++;
  if (isMatched(userPreference.work_as, loggedInUserInfo.workAs)) matchCount++;
  if (isMatched(userPreference.income, loggedInUserInfo.income)) matchCount++;

  setProfessionalCount(matchCount);

  return (
    <div className="flex flex-col justify-center items-center space-y-3 rounded-lg">
      {/* Title */}
      <div className="flex items-center gap-2 bg-purple-100 rounded-md px-3 py-2 w-full">
        <p className="text-lg font-semibold">Professional Preferences</p>
      </div>

      {/* Education */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Education</p>
        <div className="w-60 px-2 py-1">
          {renderField(userPreference.education, showFullFields.education, () =>
            toggleShowFull("education")
          )}
        </div>
        <div className="flex items-center justify-center w-12 text-2xl">
          <MatchIcon
            matched={isEducationMatched(
              userPreference.education,
              loggedInUserInfo.qualification
            )}
          />
        </div>
      </div>

      {/* Employment Type */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Employment Type</p>
        <div className="w-60 px-2 py-1">
          {renderField(userPreference.work_in, showFullFields.work_in, () =>
            toggleShowFull("work_in")
          )}
        </div>
        <div className="flex items-center justify-center w-12 text-2xl">
          <MatchIcon
            matched={isMatched(
              userPreference.work_in,
              loggedInUserInfo.workWith
            )}
          />
        </div>
      </div>

      {/* Occupation */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Occupation</p>
        <div className="w-60 px-2 py-1">
          {renderField(userPreference.work_as, showFullFields.work_as, () =>
            toggleShowFull("work_as")
          )}
        </div>
        <div className="flex items-center justify-center w-12 text-2xl">
          <MatchIcon
            matched={isMatched(userPreference.work_as, loggedInUserInfo.workAs)}
          />
        </div>
      </div>

      {/* Annual Income */}
      <div className="flex w-xl space-x-9">
        <p className="w-60 px-2 py-1">Preferred Annual Income</p>
        <div className="w-60 px-2 py-1">
          {renderField(userPreference.income, showFullFields.income, () =>
            toggleShowFull("income")
          )}
        </div>
        <div className="flex items-center justify-center w-12 text-2xl">
          <MatchIcon
            matched={isMatched(userPreference.income, loggedInUserInfo.income)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPreference;
