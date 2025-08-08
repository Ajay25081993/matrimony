import React, { useEffect, useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  TextField,
  TextareaAutosize,
  Autocomplete,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BasicPreferences from "./BasicPreferences";
import ReligiousPreferences from "./ReligiousPreferences";
import ProfessionalPreferences from "./ProfessionalPreferences";
import LocationPreferences from "./LocationPreferences";
import AboutPartner from "./AboutPartner";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { showErrorToast, showSuccessToast } from "../../lib/toast";
const UploadPartnerPreferences = ({ gender, religion }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [formData, setFormData] = useState({
    age: {
      from: "",
      to: "",
    },
    height: {
      from: "",
      to: "",
    },
    maritalStatus: "",
    motherTongue: "",
    physicalStatus: "",
    eatingHabits: "",
    drinkingHabits: "",
    smokingHabits: "",
    religion: "",
    caste: "",
    dosh: "",
    star: "",
    rashi: "",
    education: "",
    workIn: "",
    workAs: "",
    income: "",
    residingStates: "",
    residingCities: "",
    aboutPartner: "",
  });
  const [isValid, setIsValid] = useState(false);
  const navigateTo = useNavigate();

  // 📌 Validate required fields — you can customize this validation logic later
  useEffect(() => {
    const isFormValid =
      formData.age.from &&
      formData.age.to &&
      formData.height.from &&
      formData.height.to &&
      formData.aboutPartner &&
      formData.residingCities &&
      formData.motherTongue &&
      formData.education &&
      formData.drinkingHabits &&
      formData.smokingHabits &&
      formData.eatingHabits &&
      formData.workIn &&
      formData.workAs &&
      formData.residingStates &&
      formData.income &&
      formData.physicalStatus &&
      formData.religion && // religion must exist first
      (formData.religion !== "Hindu" || // if not Hindu → skip caste/star/rashi
        (formData.caste && formData.star && formData.rashi));

    setIsValid(isFormValid);
  }, [formData]);

  const onNext = async () => {
    [
      "maritalStatus",
      "eatingHabits",
      "drinkingHabits",
      "smokingHabits",
      "caste",
      "star",
      "rashi",
      "workIn",
      "workAs",
    ].forEach((field) => {
      const value = formData[field];
      if (Array.isArray(value)) {
        if (value.includes("Any") || value.includes("Doesn't matter")) {
          formData[field] = value.includes("Any") ? "Any" : "Doesn't matter";
        }
      }
    });

    [
      "maritalStatus",
      "eatingHabits",
      "drinkingHabits",
      "smokingHabits",
      "caste",
      "star",
      "rashi",
      "workIn",
      "workAs",
      "motherTongue",
      "education",
      "residingStates",
      "residingCities",
    ].forEach((field) => {
      const value = formData[field];
      if (Array.isArray(value)) {
        if (value.length != 1) {
          formData[field] = value.map((member) => member).join("|");
        } else {
          formData[field] = value[0];
        }
      }
    });

    try {
      const response = await axiosInstance.post(
        API_URLS.ADD_PREFERENCES,
        formData
      );
      console.log(response.data[0]);

      if (response.data[0]) {
        showSuccessToast(
          response.message,
          navigateTo,
          "/profile-creation/upload-photo"
        );
      }

      navigateTo("/profile-creation/upload-photo");
    } catch (error) {
      console.error("Failed to add preferences:", error);
      // optionally show a toast or alert to the user here too
      showErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-30 mb-10 w-full flex justify-center items-center ">
      <div className="shadow-sm shadow-gray-600 bg-white w-3xl rounded-md flex  px-5 flex-col py-5">
        <p className="text-xl text-center font-semibold">
          Let Us Know Your Partner Preferences <br />
          To Find <span className="text-purple-500 italic">Best Matches </span>
          For You
        </p>
        <div className="h-150 overflow-auto">
          <BasicPreferences
            gender={gender}
            formData={formData}
            setFormData={setFormData}
          />
          <ReligiousPreferences
            formData={formData}
            setFormData={setFormData}
            religion={religion}
          />
          <ProfessionalPreferences
            formData={formData}
            setFormData={setFormData}
          />
          <LocationPreferences
            formData={formData}
            setFormData={setFormData}
            icon={icon}
            checkedIcon={checkedIcon}
          />
          <AboutPartner formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-full flex justify-center">
          <button
            disabled={!isValid}
            onClick={onNext}
            className={`cursor-pointer px-8 py-3 rounded-full w-1/3 text-2xl  font-semibold  ${
              isValid
                ? "bg-pink-200 text-pink-400"
                : "bg-gray-200 text-white cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPartnerPreferences;
