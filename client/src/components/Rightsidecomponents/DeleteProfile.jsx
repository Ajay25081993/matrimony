import React from "react";

const DeleteProfile = () => {
  return (
    <div className="space-y-5">
      {" "}
      <div>
        <p className="font-semibold text-2xl">Delete Profile</p>{" "}
        <hr className=" border-gray-300 mt-3 w-4/4" />
        <p className="mt-3">Please choose a reason for profile deletion.</p>{" "}
        <p className="text-gray-400 font-bold">
          NOTE: If you delete your profile, it cannot be restored.{" "}
        </p>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full cursor-pointer text-sm">
          <input
            type="radio"
            name="call"
            value="updates"
            class="text-blue-600 w-5 h-5"
          />
          <span>MARRIAGE FIXED</span>
        </label>
        <label className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full cursor-pointer text-sm">
          <input
            type="radio"
            name="call"
            value="updates"
            class="text-blue-600 w-5 h-5"
          />
          <span>MARRIED</span>
        </label>
        <label className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full cursor-pointer text-sm">
          <input
            type="radio"
            name="call"
            value="updates"
            class="text-blue-600 w-5 h-5"
          />
          <span>OTHER REASON</span>
        </label>
      </div>
    </div>
  );
};

export default DeleteProfile;
