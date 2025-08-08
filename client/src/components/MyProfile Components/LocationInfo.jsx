import React, { useState } from "react";
import EditLocationInfo from "./Edit/EditLocationInfo";

const LocationInfo = ({ userData, userInfo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (updatedData) => {
    onSave(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="profileComponent !gap-1 ">
      <div className="flex w-full justify-between items-center">
        <p className="text-xl font-normal text-gray-400">
          {userData.gender === "Male" ? "Groom" : "Bride"}'s Location
        </p>
        {!isEditing ? (
          <button
            className="bg-blue-500 text-white px-1 text-sm rounded-sm cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <i className="ri-pencil-fill"></i> Edit
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-1 text-sm rounded-sm cursor-pointer"
            onClick={handleCancel}
          >
            <i className="ri-close-line"></i> Cancel
          </button>
        )}
      </div>

      <div
        className={` transition-all duration-1400 overflow-hidden ${
          isEditing ? "opacity-0 translate-y-20" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Static Display */}
        {!isEditing && (
          <div className="flex flex-col gap-2 mt-2 text-gray-700">
            <div className="flex items-center gap-2">
              <label className="w-48 text-gray-500">Country :</label>
              <p>India</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-48 text-gray-500">State :</label>
              <p>{userData.state}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-48 text-gray-500">City :</label>
              <p>{userInfo.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-48 text-gray-500">Ancestral Origin :</label>
              <p>Not Specified</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-48 text-gray-500">Citizenship :</label>
              <p>Indian</p>
            </div>
          </div>
        )}
      </div>

      {/* Slide-up Edit Section */}

      <EditLocationInfo
        isEditing={isEditing}
        userData={userData}
        userInfo={userInfo}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default LocationInfo;
