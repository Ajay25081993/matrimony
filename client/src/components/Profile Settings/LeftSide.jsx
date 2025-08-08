import React from "react";
//Left Child
const LeftSide = ({
  editEmail,
  setEditEmail,
  changingPassword,
  setChangingPassword,
  alerts,
  setAlerts,
  callPreference,
  setCallPreference,
  deleteProfile,
  setDeleteProfile,
  deactivateProfile,
  setDeactivateProfile,
  setProfileSetting,
  profileSetting,
}) => {
  // { editEmail, setEditEmail } er value gulo ekhne dhora hoche .... orthat okhn theke j value gulo deoa hoche segulo ekhne grohon kora hoche.
  // ekhan theke amra value gulo change krte parbo

  console.log(editEmail);

  return (
    <div className="rounded-sm w-50 bg-white text-black  shadow-gray-400 border border-gray-300">
      <div
        onClick={() => {
          setEditEmail(true);
          setChangingPassword(false);
          setAlerts(false);
          setCallPreference(false);
          setDeleteProfile(false);
          setDeactivateProfile(false);
          setProfileSetting(false);
        }}
        // Ei div e jokhn click korchi tokhn setEditEmail(true) hoche mane editEmail er value true(sotti) hoche
        className={`hover:underline  cursor-pointer  px-3 py-2 ${
          editEmail ? "bg-[#921877e2] text-[#ffffff]" : " " // editEmail true hole bg blue hbe
        } `}
      >
        {" "}
        Edit e-mail Address
      </div>

      <div
        onClick={() => {
          setChangingPassword(true);
          setEditEmail(false);
          setAlerts(false);
          setCallPreference(false);
          setDeleteProfile(false);
          setDeactivateProfile(false);
          setProfileSetting(false);
        }}
        className={`hover:underline  cursor-pointer  px-3 py-2 ${
          changingPassword ? "bg-[#921877e2] text-[#ffffff]" : " "
        } `}
      >
        {" "}
        Change Password
      </div>
        <div
        onClick={() => {
          setChangingPassword(false);
          setEditEmail(false);
          setAlerts(true);
          setCallPreference(false);
          setDeleteProfile(false);
          setDeactivateProfile(false);
          setProfileSetting(false);
        }}
        className={`hover:underline  cursor-pointer  px-3 py-2 ${
          alerts ? "bg-[#921877e2] text-[#ffffff]" : " "
        } `}
      >
        {" "}
      Alerts & Updates
      </div>
         <div
        onClick={() => {
          setChangingPassword(false);
          setEditEmail(false);
          setAlerts(false);
          setCallPreference(true);
          setDeleteProfile(false);
          setDeactivateProfile(false);
          setProfileSetting(false);
        }}
        className={`hover:underline  cursor-pointer  px-3 py-2 ${
          callPreference ? "bg-[#921877e2] text-[#ffffff]" : " "
        } `}
      >Call Preferences
        {" "}
    
      </div>
      

        <div
        onClick={() => {
          setChangingPassword(false);
          setEditEmail(false);
          setAlerts(false);
          setCallPreference(false);
          setDeleteProfile(false);
          setDeactivateProfile(false);
          setProfileSetting(true);
        }}
        className={`hover:underline  cursor-pointer  px-3 py-2 ${
          profileSetting ? "bg-[#921877e2] text-[#ffffff]" : " "
        } `}
      > Profile Settings
        {" "}
    
      </div>
      

        <div
        onClick={() => {
          setChangingPassword(false);
          setEditEmail(false);
          setAlerts(false);
          setCallPreference(false);
          setDeleteProfile(false);
          setDeactivateProfile(true);
          setProfileSetting(false);
        }}
        className={`hover:underline  cursor-pointer  px-3 py-2 ${
          deactivateProfile? "bg-[#921877e2] text-[#ffffff]" : " "
        } `}
      >  Deactivate Profile
        {" "}
    
      </div>

            <div
        onClick={() => {
          setChangingPassword(false);
          setEditEmail(false);
          setAlerts(false);
          setCallPreference(false);
          setDeleteProfile(true);
          setDeactivateProfile(false);
          setProfileSetting(false);
        }}
        className={`hover:underline  cursor-pointer  px-3 py-2 ${
          deleteProfile ? "bg-[#921877e2] text-[#ffffff]" : " "
        } `}
      > Delete Profile
        {" "}
    
      </div>

      {/* <div className=" hover:underline  cursor-pointer px-3 py-2 "> Privacy</div> */}
    
      <div className=" hover:underline  cursor-pointer px-3 py-2 ">
        {" "}
        Ignored Profiles
      </div>
      <div className=" hover:underline  cursor-pointer px-3 py-2 ">
        {" "}
        Blocked Profiles
      </div>
      <div className=" hover:underline  cursor-pointer px-3 py-2 ">Logout </div>
    </div>
  );
};

export default LeftSide;
