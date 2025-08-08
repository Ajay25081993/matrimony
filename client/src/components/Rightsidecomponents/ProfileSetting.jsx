import React from "react";

const ProfileSetting = () => {
  return (
    <div className="h-45 space-y-4">
      <div>
        {" "}
        <p className="font-semibold text-md">
          Your Profile Privacy has been set as "Show my Profile to all includig
          visitors "
        </p>
        <hr className="mt-3 border-dotted border-gray-300  w-4/4" />
      </div>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2.5 ">
          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="call"
              value="updates"
              class="text-blue-600 w-5 h-5"
            />
          </label>

          <span>
            Show my Profile to all including visitors{" "}
            <span className="bg-yellow-300 text-xs ml-2 px-2 py-0.5 rounded font-semibold text-gray-700">
              Recommended
            </span>
          </span>
        </div>
        <div>
          <label class="flex items-center space-x-3">
            <input
              type="radio"
              name="call"
              value="1month"
              class="text-blue-600 w-5 h-5"
            />
            <span>Show my Profile to registered members only</span>
          </label>
        </div>
        <hr className="mt-3 border-dotted border-gray-300  w-4/4" />
        <div>
          <label class="flex items-center space-x-3">
            <input
              type="checkbox"
              name="call"
              value="1month"
              class="text-blue-600 w-5 h-5"
            />
            <span>Let others know that I shortlisted their profile</span>
          </label>
        </div>

        <div className="mt-13 w-full  text-center flex justify-end">
          <button className="bg-purple-300 hover:bg-purple-400 rounded text-center w-20 font-bold broder-2 border-gray-300 text-white cursor-pointer">
            {" "}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
