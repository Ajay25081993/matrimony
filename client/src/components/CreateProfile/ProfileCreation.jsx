import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { heights } from "./heights";
import { subCommunity } from "./subCommunity";
import { diet } from "./diet";
import { maritalStatus } from "./maritalStatus";
import { children } from "./Children";
import {
  CircularProgress,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { languages } from "./language";
import axios from "axios";
import { physicalStatus } from "../Give Partner Preferences/allOptions";
const ProfileCreation = ({ formData, setFormData }) => {
  const navigateTo = useNavigate();
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const {
      language,
      city,
      liveWithFamily,
      maritalStatus,
      diet,
      height,
      hasChildren,
      subCommunity,
      physicalStatus,
    } = formData;
    if (
      city &&
      language.length &&
      liveWithFamily &&
      (maritalStatus === "Never married" || hasChildren) &&
      diet &&
      height &&
      physicalStatus &&
      subCommunity
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };
  const onNext = () => {
    console.log(
      formData.language.map((lang, i) =>
        i === 0 ? `${lang.title} (Mother Tongue)` : lang.title
      ).join(",")
    );

    navigateTo(`/profile-creation/step/2`);
  };

  const showError = (field) => !formData[field]?.length && touched[field];

  // Fetch cities via Axios with try-catch
  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/data/indianCities.json");
      console.log(response);

      setCities(response.data); // assuming data is an array of city names
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="mt-30 mb-10 w-full flex-col gap-4 flex justify-center items-center">
      <div className="shadow-sm shadow-gray-600 bg-white w-3xl rounded-md flex justify-center items-center gap-4 flex-col p-5">
        <p className="text-2xl">Let's create your profile now</p>
        <Stack
          spacing={3}
          sx={{ width: 440, "& .MuiInputLabel-root": { fontSize: "17px" } }}
        >
          <Autocomplete
            multiple
            id="tags-standard"
            options={languages}
            value={formData.language}
            onChange={(event, newValue) => {
              setFormData((prev) => ({ ...prev, language: newValue }));
              setTouched((prev) => ({ ...prev, language: true }));
            }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                helperText={
                  showError("language")
                    ? "Please select at least one language"
                    : ""
                }
                error={showError("language")}
                {...params}
                variant="standard"
                label="Languages Known(Choose your mother tongue first)"
                placeholder={
                  formData.language?.length ? "" : "Select languages"
                }
              />
            )}
          />
        </Stack>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
            "& .MuiInputLabel-root": { fontSize: "16px" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="flex justify-center items-center flex-col gap-5">
            {/* City */}
            <TextField
              error={
                showError("city") ||
                (formData.city.length < 4 && formData.city.length != 0)
              }
              required
              label="City you live in?"
              value={formData.city}
              onChange={(e) => {
                const value = e.target.value;
                // allow only letters and spaces
                const onlyLetters = value.replace(/[^a-zA-Z\s]/g, "");
                handleChange("city", onlyLetters);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
              variant="standard"
              helperText={
                showError("city")
                  ? "Please enter your city"
                  : formData.city.length < 4 && formData.city.length != 0
                  ? "City name must be at least 4 characters"
                  : ""
              }
            />

            {/* <Autocomplete
              freeSolo
              disableClearable
              options={cities}
              loading={loading}
              value={formData.city}
              onInputChange={(event, newValue) => {
                // restrict to alphabet input only
                const alphaOnly = newValue.replace(/[^a-zA-Z\s]/g, "");
                setFormData({ ...formData, city: alphaOnly });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City you live in?"
                  required
                  variant="standard"
                  error={
                    showError("city") ||
                    (formData.city.length < 4 && formData.city.length !== 0)
                  }
                  helperText={
                    showError("city")
                      ? "Please enter your city"
                      : formData.city.length < 4 && formData.city.length !== 0
                      ? "City name must be at least 4 characters"
                      : ""
                  }
                  onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            /> */}

            {/* Live with Family */}
            <div className="w-full flex flex-col gap-1 px-2">
              <p>You live with your family?*</p>
              <div className="flex flex-wrap gap-2 w-1/2">
                {["Yes", "No"].map((option) => (
                  <div
                    key={option}
                    onClick={() => handleChange("liveWithFamily", option)}
                    className={`hover:bg-sky-200 hover:text-black cursor-pointer px-2 py-1 flex justify-center items-center h-8 border-1 rounded-full border-gray-300 ${
                      formData.liveWithFamily === option
                        ? "bg-sky-500 text-white"
                        : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              {showError("liveWithFamily") && (
                <p className="text-red-500 text-sm">Please select an option</p>
              )}
            </div>

            {/* Marital Status */}
            <TextField
              error={showError("maritalStatus")}
              select
              required
              label="Your marital status"
              value={formData.maritalStatus}
              onChange={(e) => handleChange("maritalStatus", e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, maritalStatus: true }))
              }
              slotProps={{ select: { native: true } }}
              variant="standard"
              helperText={
                showError("maritalStatus") ? "Please select an option" : ""
              }
            >
              {maritalStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>

            {/* Children if applicable */}
            {formData.maritalStatus !== "Never married" &&
              formData.maritalStatus !== "Select" &&
              formData.maritalStatus && (
                <div className="flex flex-col w-full px-2 gap-1">
                  <p>Do you have any children?*</p>
                  <div className="flex flex-wrap gap-2 w-80">
                    {children.map((type, index) => (
                      <div
                        key={index}
                        onClick={() => handleChange("hasChildren", type)}
                        className={`hover:bg-sky-200 hover:text-black cursor-pointer px-2 py-1 flex justify-center items-center h-8 border-1 rounded-full border-gray-300 ${
                          formData.hasChildren === type
                            ? "bg-sky-500 text-white"
                            : ""
                        }`}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                  {showError("hasChildren") && (
                    <p className="text-red-500 text-sm">
                      Please select an option
                    </p>
                  )}
                </div>
              )}

            {/* Diet */}
            <div className="flex flex-col w-full px-2 gap-1">
              <p>Your diet*</p>
              <div className="flex flex-wrap gap-2 w-80">
                {diet.map((type, index) => (
                  <div
                    key={index}
                    onClick={() => handleChange("diet", type)}
                    className={`hover:bg-sky-200 hover:text-black cursor-pointer px-2 py-1 flex justify-center items-center h-8 border-1 rounded-full border-gray-300 ${
                      formData.diet === type ? "bg-sky-500 text-white" : ""
                    }`}
                  >
                    {type}
                  </div>
                ))}
              </div>
              {showError("diet") && (
                <p className="text-red-500 text-sm">Please select an option</p>
              )}
            </div>

            {/* Height */}
            <TextField
              error={showError("height")}
              select
              required
              label="Your height"
              value={formData.height}
              onChange={(e) => handleChange("height", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, height: true }))}
              slotProps={{ select: { native: true } }}
              variant="standard"
              helperText={
                showError("height") ? "Please select your height" : ""
              }
            >
              {heights.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>

            {/* Weight
            <TextField
              error={showError("weight")}
              select
              required
              label="Your weight"
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, weight: true }))}
              slotProps={{ select: { native: true } }}
              variant="standard"
              helperText={
                showError("weight") ? "Please select your weight" : ""
              }
            >
              {weights.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField> */}

            <div className="w-full">
              <p className="mb-1">Physical Status</p>
              <RadioGroup
                row
                value={formData.physicalStatus}
                onChange={(e) => handleChange("physicalStatus", e.target.value)}
              >
                {physicalStatus.map((status, index) => (
                  <FormControlLabel
                    key={index}
                    value={status}
                    control={<Radio />}
                    label={status}
                  />
                ))}
              </RadioGroup>
            </div>

            {/* Sub-Community */}
            <TextField
              error={showError("subCommunity")}
              select
              required
              label="Your sub-community"
              value={formData.subCommunity}
              onChange={(e) => handleChange("subCommunity", e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, subCommunity: true }))
              }
              slotProps={{ select: { native: true } }}
              variant="standard"
              helperText={
                showError("subCommunity") ? "Please select a sub-community" : ""
              }
            >
              {subCommunity.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
            {formData.subCommunity !== "Select" && (
              <div className="flex items-center justify-center gap-2 ml-2">
                <input
                  id="community"
                  type="checkbox"
                  className="w-4 h-4 mt-1"
                  onClick={() => (formData.casteNoBar = true)}
                />
                <label htmlFor="community">
                  Not particular about my Partner's Community (Caste No Bar)
                </label>
              </div>
            )}
          </div>
        </Box>

        <div className=" w-full flex justify-center ">
          <button
            disabled={!isValid}
            onClick={() => {
              onNext();
            }}
            className={`cursor-pointer px-8 py-3 rounded-full w-1/3 text-2xl  font-semibold  ${
              isValid
                ? "bg-sky-300 text-sky-700"
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

export default ProfileCreation;
