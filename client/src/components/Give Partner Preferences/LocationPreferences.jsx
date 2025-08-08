// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Checkbox,
//   TextField,
//   Autocomplete,
//   CircularProgress,
// } from "@mui/material";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";

// const LocationPreferences = ({ formData, setFormData }) => {
//   const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//   const checkedIcon = <CheckBoxIcon fontSize="small" />;

//   const [allStates, setAllStates] = useState([]);
//   const [availableCities, setAvailableCities] = useState([]);
//   const [loadingCities, setLoadingCities] = useState(false);

//   // 📌 Fetch Indian states on mount
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const res = await axios.post(
//           "https://countriesnow.space/api/v0.1/countries/states",
//           { country: "India" }
//         );
//         const stateList = res.data.data.states.map((s) => s.name);
//         setAllStates(stateList);
//       } catch (err) {
//         console.error("Failed to fetch states:", err);
//       }
//     };
//     fetchStates();
//   }, []);

//   // 📌 Fetch cities when states change
//   useEffect(() => {
//     const fetchCities = async () => {
//       if (formData.residingStates && formData.residingStates.length > 0) {
//         setLoadingCities(true);
//         try {
//           const cityResponses = await Promise.all(
//             formData.residingStates.map(async (state) => {
//               const res = await axios.post(
//                 "https://countriesnow.space/api/v0.1/countries/state/cities",
//                 {
//                   country: "India",
//                   state: state,
//                 }
//               );
//               return res.data.data;
//             })
//           );

//           const allCities = Array.from(new Set(cityResponses.flat()));
//           setAvailableCities(allCities);
//           setFormData((prev) => ({ ...prev, residingCities: [] }));
//         } catch (err) {
//           console.error("Failed to fetch cities:", err);
//         } finally {
//           setLoadingCities(false);
//         }
//       } else {
//         setAvailableCities([]);
//         setFormData((prev) => ({ ...prev, residingCities: [] }));
//       }
//     };

//     fetchCities();
//   }, [formData.residingStates]);

//   const handleStateChange = (event, newValue) => {
//     setFormData((prev) => ({
//       ...prev,
//       residingStates: newValue,
//     }));
//   };

//   const handleCityChange = (event, newValue) => {
//     setFormData((prev) => ({
//       ...prev,
//       residingCities: newValue,
//     }));
//   };

//   return (
//     <div className="flex">
//       <i className="ri-map-pin-line text-4xl mt-3 text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 rounded-r-2xl rounded-bl-2xl p-1"></i>

//       <div className="w-2xl px-4 py-4">
//         <p className="text-xl font-semibold mb-4">Location Preferences</p>
//         <div className="space-y-4">
//           {/* Residing State */}
//           <div className="w-full">
//             <p className="mb-3">Residing State</p>
//             <Autocomplete
//               multiple
//               options={allStates}
//               disableCloseOnSelect
//               value={formData.residingStates || []}
//               onChange={handleStateChange}
//               getOptionLabel={(option) => option}
//               isOptionEqualToValue={(option, value) => option === value}
//               renderOption={(props, option, { selected }) => (
//                 <li {...props}>
//                   <Checkbox
//                     icon={icon}
//                     checkedIcon={checkedIcon}
//                     style={{ marginRight: 8 }}
//                     checked={selected}
//                   />
//                   {option}
//                 </li>
//               )}
//               style={{ width: 650 }}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </div>

//           {/* Residing City */}
//           <div className="w-full">
//             <p className="mb-3">Residing City</p>
//             <Autocomplete
//               multiple
//               options={availableCities}
//               disableCloseOnSelect
//               loading={loadingCities}
//               value={formData.residingCities || []}
//               onChange={handleCityChange}
//               getOptionLabel={(option) => option}
//               isOptionEqualToValue={(option, value) => option === value}
//               renderOption={(props, option, { selected }) => (
//                 <li {...props}>
//                   <Checkbox
//                     icon={icon}
//                     checkedIcon={checkedIcon}
//                     style={{ marginRight: 8 }}
//                     checked={selected}
//                   />
//                   {option}
//                 </li>
//               )}
//               style={{ width: 650 }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   InputProps={{
//                     ...params.InputProps,
//                     endAdornment: (
//                       <>
//                         {loadingCities ? <CircularProgress size={18} /> : null}
//                         {params.InputProps.endAdornment}
//                       </>
//                     ),
//                   }}
//                 />
//               )}
//               disabled={formData.residingStates?.length === 0}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationPreferences;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Checkbox,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const LocationPreferences = ({ formData, setFormData }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country: "India" }
        );
        if (response.data.data.states) {
          const stateNames = response.data.data.states.map((s) => s.name);
          setStates(stateNames);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when a state is selected
  const fetchCities = async (selectedStates) => {
    try {
      setLoadingCities(true);
      const citySet = new Set();
      for (const state of selectedStates) {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          { country: "India", state }
        );
        res.data.data.forEach((city) => citySet.add(city));
      }
      setCities(Array.from(citySet));
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      setLoadingCities(false);
    }
  };

  // handle selecting states
  const handleStatesChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      residingStates: newValue,
      residingCities: [], // reset cities when state changes
    }));
    if (newValue.length > 0) {
      fetchCities(newValue);
    } else {
      setCities([]);
    }
  };

  // handle selecting cities
  const handleCitiesChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      residingCities: newValue,
    }));
  };

  return (
    <div className="flex">
      <i className="ri-map-pin-line text-4xl mt-3 text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 rounded-r-2xl rounded-bl-2xl p-1"></i>
      <div className="w-2xl px-4 py-4">
        <p className="text-xl font-semibold mb-4">Location Preferences</p>

        <div className="space-y-4">
          {/* Residing States */}
          <div className="w-full">
            <p className="mb-3">Residing State</p>
            <Autocomplete
              multiple
              options={states}
              disableCloseOnSelect
              value={formData.residingStates || []}
              onChange={handleStatesChange}
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              loading={loadingStates}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="🔍 Search States..."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingStates ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              style={{ width: 650 }}
            />
          </div>

          {/* Residing Cities */}
          <div className="w-full">
            <p className="mb-3">Residing City</p>
            <Autocomplete
              multiple
              options={cities}
              disableCloseOnSelect
              value={formData.residingCities || []}
              onChange={handleCitiesChange}
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              loading={loadingCities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="🔍 Search Cities..."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingCities ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              style={{ width: 650 }}
              disabled={formData.residingStates?.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPreferences;
