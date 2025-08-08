// import React, { useState } from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import FormHelperText from "@mui/material/FormHelperText";
// import { motherOption, fatherOption, number } from "./option";

// const Family = ({ formData, setFormData, handleSubmit }) => {
//   const [touched, setTouched] = useState({
//     mother: false,
//     father: false,
//     sister: false,
//     brother: false,
//   });

//   const [isValid, setIsValid] = useState(false);

//   const requiredFields = ["mother", "father", "sister", "brother"];

//   // Validate form on every relevant state change
//   const validateForm = (updatedFormData) => {
//     const isAllFilled = requiredFields.every((field) => {
//       const value = updatedFormData[field];
//       return (
//         value !== null && value !== undefined && String(value).trim() !== ""
//       );
//     });
//     setIsValid(isAllFilled);
//   };

//   // Handle input change
//   const handleChange = (field) => (event) => {
//     const newValue = event.target.value;
//     const updatedFormData = { ...formData, [field]: newValue };
//     setFormData(updatedFormData);
//     validateForm(updatedFormData);
//   };

//   // Handle input blur (touched)
//   const handleBlur = (field) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//     validateForm(formData);
//   };

//   const onNext = () => {
//     handleSubmit();
//   };

//   // Reusable select field component
//   const renderSelectField = (label, field, options) => (
//     <FormControl
//       variant="standard"
//       sx={{ m: 1, minWidth: 300 }}
//       error={touched[field] && formData[field] === ""}
//     >
//       <InputLabel
//         sx={{ fontSize: "17px", fontWeight: 500 }}
//         id={`${field}-label`}
//       >
//         {label}
//       </InputLabel>
//       <Select
//         labelId={`${field}-label`}
//         value={formData[field]}
//         onChange={handleChange(field)}
//         onBlur={() => handleBlur(field)}
//       >
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         {options.map((option, index) => (
//           <MenuItem key={index} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </Select>
//       {touched[field] && formData[field] === "" && (
//         <FormHelperText>Please select {label}</FormHelperText>
//       )}
//     </FormControl>
//   );

//   return (
//     <div className="mt-30 mb-10 w-full flex-col gap-4 flex justify-center items-center">
//       <div className="shadow-sm shadow-gray-600 bg-white w-3xl rounded-md flex justify-center items-center gap-4 flex-col p-5">
//         <div className="w-full flex justify-center">
//           <i className="ri-group-3-line text-purple-500 w-20 h-20 text-5xl text-shadow-md text-shadow-purple-400 flex justify-center items-center bg-purple-200 rounded-full"></i>
//         </div>
//         <p className="text-2xl font-semibold">Add family details</p>

//         {/* Form Fields */}
//         {renderSelectField("Mother's Details", "mother", motherOption)}
//         {renderSelectField("Father's Details", "father", fatherOption)}
//         {renderSelectField("No. of Sisters", "noOfSister", number)}
//         {renderSelectField("No. of Brothers", "noOfBrother", number)}

//         {/* Continue Button */}
//         <div className="w-full flex justify-center">
//           <button
//             disabled={!isValid}
//             onClick={onNext}
//             className={`cursor-pointer px-8 py-3 rounded-full w-1/3 text-2xl  font-semibold  ${
//               isValid
//                 ? "bg-purple-200 text-purple-500"
//                 : "bg-gray-200 text-white cursor-not-allowed"
//             }`}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Family;

import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { motherOption, fatherOption, number } from "./option";
import { useNavigate } from "react-router-dom";

const Family = ({ formData, setFormData, handleSubmit }) => {
  const [touched, setTouched] = useState({
    mother: false,
    father: false,
    noOfSister: false,
    noOfBrother: false,
  });

  const [isValid, setIsValid] = useState(false);
  const navigateTo = useNavigate();
  const requiredFields = ["mother", "father", "noOfSister", "noOfBrother"];

  // Validate form by checking empty, null or undefined (0 is valid)
  const validateForm = (updatedFormData) => {
    const isAllFilled = requiredFields.every((field) => {
      const value = updatedFormData[field];
      return value !== "" && value !== null && value !== undefined;
    });
    setIsValid(isAllFilled);
  };

  // Handle input change
  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    const updatedFormData = { ...formData, [field]: newValue };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  // Handle input blur
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm(formData);
  };

  const onNext = () => {
    navigateTo("/profile-creation/partner-preferences");
  };

  // Reusable Select field component
  const renderSelectField = (label, field, options) => {
    const hasError =
      touched[field] &&
      (formData[field] === "" ||
        formData[field] === null ||
        formData[field] === undefined);

    return (
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 300 }}
        error={hasError}
      >
        <InputLabel
          sx={{ fontSize: "17px", fontWeight: 500 }}
          id={`${field}-label`}
        >
          {label}
        </InputLabel>
        <Select
          labelId={`${field}-label`}
          value={formData[field] ?? ""}
          onChange={handleChange(field)}
          onBlur={() => handleBlur(field)}
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {hasError && <FormHelperText>Please select {label}</FormHelperText>}
      </FormControl>
    );
  };

  return (
    <div className="mt-30 mb-10 w-full flex-col gap-4 flex justify-center items-center">
      <div className="shadow-sm shadow-gray-600 bg-white w-3xl rounded-md flex justify-center items-center gap-4 flex-col p-5">
        <div className="w-full flex justify-center">
          <i className="ri-group-3-line text-purple-500 w-20 h-20 text-5xl flex justify-center items-center bg-purple-200 rounded-full"></i>
        </div>
        <p className="text-2xl font-semibold">Add family details</p>

        {/* Form Fields */}
        {renderSelectField("Mother's Details", "mother", motherOption)}
        {renderSelectField("Father's Details", "father", fatherOption)}
        {renderSelectField("No. of Sisters", "noOfSister", number)}
        {renderSelectField("No. of Brothers", "noOfBrother", number)}

        {/* Continue Button */}
        <div className="w-full flex justify-center">
          <button
            disabled={!isValid}
            onClick={onNext}
            className={`cursor-pointer px-8 py-3 rounded-full w-1/3 text-2xl font-semibold ${
              isValid
                ? "bg-purple-200 text-purple-500"
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

export default Family;
