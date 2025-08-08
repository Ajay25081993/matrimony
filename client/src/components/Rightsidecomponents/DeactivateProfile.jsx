import React from "react";

const DeactivateProfile = () => {
  return (
    <div className="">
      <div>
        <p className="font-semibold text-xl">Detective Profile</p>
        <hr className=" border-dotted border-gray-300 mt-3 w-4/4" />
      </div>
      <div className="space-y-3">
        <p className="text-xs">
          You can temporarily deactivate your profile if you do not want to
          delete it. On deactivation your profile will be hidden from our
          members and you will not be able to contact any member until you
          activate
        </p>
        <p className="text-xs">
          Your profile status is currently active, If you would like to change
          your status, please select Deactivate Now.
        </p>
        <div className="space-y-2">
          <p className="text-sm font-bold">
            Select the number of days / months you would like to keep your
            profile deactivated
          </p>
          <select className=" border border-gray-300 rounded-md shadow-sm p-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">-- Select --</option>
            <option value="1week">1 Week</option>
            <option value="1week">15 Days</option>
            <option value="1month">1 Month</option>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
          </select>
          <p className="text-xs text-gray-400">
            NOTE : Your profile will be activated after the selected time period
            elapses E.G. If you select 15 days as the time period, your profile
            will be deactivated for 15 days and will be automatically activated
            on the 16th day. You will receive a mailer in this regard
          </p>
        </div>
        <hr className=" size-4 border-dotted border-gray-300 mt-3 w-4/4" />
        <div className=" text-center flex justify-end">
          <button className="bg-purple-300 hover:bg-purple-400 rounded text-center w-30 font-bold broder-2 border-gray-300 text-white cursor-pointer">
            {" "}
            Submit
          </button>
        <div>
          <p className="text-xs text-gray-400">
            Note: Once you deactivate your profile you will not be able to
            contact any member either through Express interest, Personalised
            Messages or Chat and your profile details will also not be visible
            to members.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateProfile;
