import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useState } from "react";
//Parent Page
const Setting = () => {
  const [editEmail, setEditEmail] = useState(true);
  const [changingPassword, setChangingPassword] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [callPreference, setCallPreference] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deactivateProfile, setDeactivateProfile] = useState(false);
  const [profileSetting, setProfileSetting] = useState(false);

  return (
    <div className="w-full flex flex-col items-center bg-gray-100  py-30">
      <div className="space-y-2">
        <p className="w-60 text-xl font-semibold">Profile Settings</p>

        <div className="flex  gap-5">
          <LeftSide
            setEditEmail={setEditEmail}
            editEmail={editEmail}
            setChangingPassword={setChangingPassword}
            changingPassword={changingPassword}
            setAlerts={setAlerts}
            alerts={alerts}
            setCallPreference={setCallPreference}
            callPreference={callPreference}
            setDeleteProfile={setDeleteProfile}
            deleteProfile={deleteProfile}
            setDeactivateProfile={setDeactivateProfile}
            deactivateProfile={deactivateProfile}
            setProfileSetting={setProfileSetting}
            profileSetting={profileSetting}
          />
          <RightSide
            editEmail={editEmail}
            changingPassword={changingPassword}
            alerts={alerts}
            callPreference={callPreference}
            deleteProfile={deleteProfile}
            deactivateProfile={deactivateProfile}
            profileSetting={profileSetting}
          />
        </div>
      </div>
    </div>
  );
};

export default Setting;
