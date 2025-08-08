// import React from "react";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import {
//   ages,
//   drinkingHabits,
//   maritalStatuses,
//   physicalStatus,
//   smokingHabits,
// } from "./allOptions";
// import { languages } from "../CreateProfile/language";
// import {
//   Autocomplete,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
//   TextField,
// } from "@mui/material";
// const BasicPreferences = ({ gender,formData,setFormData }) => {
//   const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//   const checkedIcon = <CheckBoxIcon fontSize="small" />;
//   return (
//     <div className="flex">
//       <i class="ri-file-list-3-line text-4xl mt-3 text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 rounded-r-2xl rounded-bl-2xl p-1"></i>
//       <div className=" w-2xl px-4 py-4 ">
//         <p className="text-xl font-semibold mb-4">Basic Preferences</p>
//         <div className="space-y-4">
//           <div className="w-full">
//             <label htmlFor="">
//               {gender === "Male" ? "Bride" : "Groom"}'s Age
//             </label>
//             <div className="flex justify-between">
//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel id="demo-simple-select-standard-label">
//                   From
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-standard-label"
//                   id="demo-simple-select-standard"
//                   value={""}
//                   onChange={""}
//                   label="From"
//                   MenuProps={{
//                     PaperProps: {
//                       sx: {
//                         maxHeight: 300, // set your desired popup height here
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {ages.map((age, index) => {
//                     return (
//                       <MenuItem key={index} value={age}>
//                         {age}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>

//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel id="demo-simple-select-standard-label">
//                   To
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-standard-label"
//                   id="demo-simple-select-standard"
//                   value={""}
//                   onChange={""}
//                   label="From"
//                   MenuProps={{
//                     PaperProps: {
//                       sx: {
//                         maxHeight: 300, // set your desired popup height here
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {ages.map((age, index) => {
//                     return (
//                       <MenuItem key={index} value={age}>
//                         {age}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </div>
//           </div>

//           <div className="w-full">
//             <label htmlFor="">Height</label>
//             <div className="flex justify-between">
//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel id="demo-simple-select-standard-label">
//                   From
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-standard-label"
//                   id="demo-simple-select-standard"
//                   value={""}
//                   onChange={""}
//                   label="From"
//                   MenuProps={{
//                     PaperProps: {
//                       sx: {
//                         maxHeight: 300, // set your desired popup height here
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {ages.map((age, index) => {
//                     return (
//                       <MenuItem key={index} value={age}>
//                         {age}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>

//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel id="demo-simple-select-standard-label">
//                   To
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-standard-label"
//                   id="demo-simple-select-standard"
//                   value={""}
//                   onChange={""}
//                   label="From"
//                   MenuProps={{
//                     PaperProps: {
//                       sx: {
//                         maxHeight: 300, // set your desired popup height here
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {ages.map((age, index) => {
//                     return (
//                       <MenuItem key={index} value={age}>
//                         {age}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </div>
//           </div>

//           <div className="w-full">
//             <p className="mb-3">Marital Status</p>
//             <div className="flex justify-between">
//               <Autocomplete
//                 multiple
//                 id="checkboxes-tags-demo"
//                 options={maritalStatuses}
//                 disableCloseOnSelect
//                 getOptionLabel={(option) => option}
//                 renderOption={(props, option, { selected }) => {
//                   const { key, ...optionProps } = props;
//                   return (
//                     <li key={key} {...optionProps}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option}
//                     </li>
//                   );
//                 }}
//                 style={{ width: 650 }}
//                 renderInput={(params) => (
//                   <TextField {...params} label="" placeholder="" />
//                 )}
//               />
//             </div>
//           </div>

//           <div className="w-full">
//             <p className="mb-3">Mother Tounge</p>
//             <div className="flex justify-between">
//               <Autocomplete
//                 multiple
//                 id="checkboxes-tags-demo"
//                 options={languages}
//                 disableCloseOnSelect
//                 getOptionLabel={(option) => option.title}
//                 renderOption={(props, option, { selected }) => {
//                   const { key, ...optionProps } = props;
//                   return (
//                     <li key={key} {...optionProps}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option.title}
//                     </li>
//                   );
//                 }}
//                 style={{ width: 650 }}
//                 renderInput={(params) => (
//                   <TextField {...params} label="" placeholder="" />
//                 )}
//               />
//             </div>
//           </div>

//           <div className="w-full">
//             <p className="mb-1">Physical Status</p>
//             <div className="flex justify-between">
//               <FormControl variant="standard" sx={{ mt: 0, minWidth: 640 }}>
//                 <Select
//                   labelId="demo-simple-select-standard-label"
//                   id="demo-simple-select-standard"
//                   value={""}
//                   onChange={""}
//                   label="From"
//                   MenuProps={{
//                     PaperProps: {
//                       sx: {
//                         maxHeight: 300, // set your desired popup height here
//                       },
//                     },
//                   }}
//                 >
//                   {physicalStatus.map((status, index) => {
//                     return (
//                       <RadioGroup
//                         key={index}
//                         aria-labelledby="demo-radio-buttons-group-label"
//                         defaultValue=""
//                         name="radio-buttons-group"
//                       >
//                         <FormControlLabel
//                           className="ml-2"
//                           value={status}
//                           control={<Radio />}
//                           label={status}
//                         />
//                       </RadioGroup>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </div>
//           </div>

//           <div className="w-full">
//             <p className="mb-3">Drinking Habits</p>
//             <div className="flex justify-between">
//               <Autocomplete
//                 multiple
//                 id="checkboxes-tags-demo"
//                 options={drinkingHabits}
//                 disableCloseOnSelect
//                 getOptionLabel={(option) => option}
//                 renderOption={(props, option, { selected }) => {
//                   const { key, ...optionProps } = props;
//                   return (
//                     <li key={key} {...optionProps}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option}
//                     </li>
//                   );
//                 }}
//                 style={{ width: 650 }}
//                 renderInput={(params) => (
//                   <TextField {...params} label="" placeholder="" />
//                 )}
//               />
//             </div>
//           </div>

//           <div className="w-full">
//             <p className="mb-3">Smoking Habits</p>
//             <div className="flex justify-between">
//               <Autocomplete
//                 multiple
//                 id="checkboxes-tags-demo"
//                 options={smokingHabits}
//                 disableCloseOnSelect
//                 getOptionLabel={(option) => option}
//                 renderOption={(props, option, { selected }) => {
//                   const { key, ...optionProps } = props;
//                   return (
//                     <li key={key} {...optionProps}>
//                       <Checkbox
//                         icon={icon}
//                         checkedIcon={checkedIcon}
//                         style={{ marginRight: 8 }}
//                         checked={selected}
//                       />
//                       {option}
//                     </li>
//                   );
//                 }}
//                 style={{ width: 650 }}
//                 renderInput={(params) => (
//                   <TextField {...params} label="" placeholder="" />
//                 )}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicPreferences;

// import React from "react";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import {
//   ages,
//   drinkingHabits,
//   maritalStatuses,
//   physicalStatus,
//   smokingHabits,
// } from "./allOptions";
// import { languages } from "../CreateProfile/language";
// import {
//   Autocomplete,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
//   TextField,
// } from "@mui/material";
// import { heights } from "../CreateProfile/heights";

// const BasicPreferences = ({ gender, formData, setFormData }) => {
//   const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//   const checkedIcon = <CheckBoxIcon fontSize="small" />;

//   return (
//     <div className="flex">
//       <i class="ri-file-list-3-line text-4xl mt-3 text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 rounded-r-2xl rounded-bl-2xl p-1"></i>
//       <div className=" w-2xl px-4 py-4 ">
//         <p className="text-xl font-semibold mb-4">Basic Preferences</p>
//         <div className="space-y-4">
//           {/* Age */}
//           <div className="w-full">
//             <label>{gender === "Male" ? "Bride" : "Groom"}'s Age</label>
//             <div className="flex justify-between">
//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel>From</InputLabel>
//                 <Select
//                   value={formData.age.from}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       age: { ...formData.age, from: e.target.value },
//                     })
//                   }
//                 >
//                   {ages.map((age, index) => (
//                     <MenuItem key={index} value={age}>
//                       {age}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel>To</InputLabel>
//                 <Select
//                   value={formData.age.to}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       age: { ...formData.age, to: e.target.value },
//                     })
//                   }
//                 >
//                   {ages.map((age, index) => (
//                     <MenuItem key={index} value={age}>
//                       {age}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>
//           </div>

//           {/* Height */}
//           <div className="w-full">
//             <label>Height</label>
//             <div className="flex justify-between">
//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel>From</InputLabel>
//                 <Select
//                   value={formData.height.from}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       height: { ...formData.height, from: e.target.value },
//                     })
//                   }
//                 >
//                   {heights.map((age, index) => (
//                     <MenuItem key={index} value={age}>
//                       {age}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
//                 <InputLabel>To</InputLabel>
//                 <Select
//                   value={formData.height.to}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       height: { ...formData.height, to: e.target.value },
//                     })
//                   }
//                 >
//                   {heights.map((age, index) => (
//                     <MenuItem key={index} value={age}>
//                       {age}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>
//           </div>

//           {/* Marital Status */}
//           <div className="w-full">
//             <p className="mb-3">Marital Status</p>
//             <Autocomplete
//               multiple
//               options={maritalStatuses}
//               disableCloseOnSelect
//               getOptionLabel={(option) => option}
//               value={formData.maritalStatus || []}
//               onChange={(event, newValue) =>
//                 setFormData({ ...formData, maritalStatus: newValue })
//               }
//               renderOption={(props, option, { selected }) => {
//                 const { key, ...optionProps } = props;
//                 return (
//                   <li key={key} {...optionProps}>
//                     <Checkbox
//                       icon={icon}
//                       checkedIcon={checkedIcon}
//                       style={{ marginRight: 8 }}
//                       checked={selected}
//                     />
//                     {option}
//                   </li>
//                 );
//               }}
//               style={{ width: 650 }}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </div>

//           {/* Mother Tongue */}
//           <div className="w-full">
//             <p className="mb-3">Mother Tongue</p>
//             <Autocomplete
//               multiple
//               options={languages}
//               disableCloseOnSelect
//               getOptionLabel={(option) => option.title}
//               value={formData.motherTongue || []}
//               onChange={(event, newValue) =>
//                 setFormData({ ...formData, motherTongue: newValue })
//               }
//               renderOption={(props, option, { selected }) => {
//                 const { key, ...optionProps } = props;
//                 return (
//                   <li key={key} {...optionProps}>
//                     <Checkbox
//                       icon={icon}
//                       checkedIcon={checkedIcon}
//                       style={{ marginRight: 8 }}
//                       checked={selected}
//                     />
//                     {option.title}
//                   </li>
//                 );
//               }}
//               style={{ width: 650 }}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </div>

//           {/* Physical Status */}
//           <div className="w-full">
//             <p className="mb-1">Physical Status</p>
//             <RadioGroup
//               row
//               value={formData.physicalStatus}
//               onChange={(e) =>
//                 setFormData({ ...formData, physicalStatus: e.target.value })
//               }
//             >
//               {physicalStatus.map((status, index) => (
//                 <FormControlLabel
//                   key={index}
//                   value={status}
//                   control={<Radio />}
//                   label={status}
//                 />
//               ))}
//             </RadioGroup>
//           </div>

//           {/* Drinking Habits */}
//           <div className="w-full">
//             <p className="mb-3">Drinking Habits</p>
//             <Autocomplete
//               multiple
//               options={drinkingHabits}
//               disableCloseOnSelect
//               getOptionLabel={(option) => option}
//               value={formData.drinkingHabits || []}
//               onChange={(event, newValue) =>
//                 setFormData({ ...formData, drinkingHabits: newValue })
//               }
//               renderOption={(props, option, { selected }) => {
//                 const { key, ...optionProps } = props;
//                 return (
//                   <li key={key} {...optionProps}>
//                     <Checkbox
//                       icon={icon}
//                       checkedIcon={checkedIcon}
//                       style={{ marginRight: 8 }}
//                       checked={selected}
//                     />
//                     {option}
//                   </li>
//                 );
//               }}
//               style={{ width: 650 }}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </div>

//           {/* Smoking Habits */}
//           <div className="w-full">
//             <p className="mb-3">Smoking Habits</p>
//             <Autocomplete
//               multiple
//               options={smokingHabits}
//               disableCloseOnSelect
//               getOptionLabel={(option) => option}
//               value={formData.smokingHabits || []}
//               onChange={(event, newValue) =>
//                 setFormData({ ...formData, smokingHabits: newValue })
//               }
//               renderOption={(props, option, { selected }) => {
//                 const { key, ...optionProps } = props;
//                 return (
//                   <li key={key} {...optionProps}>
//                     <Checkbox
//                       icon={icon}
//                       checkedIcon={checkedIcon}
//                       style={{ marginRight: 8 }}
//                       checked={selected}
//                     />
//                     {option}
//                   </li>
//                 );
//               }}
//               style={{ width: 650 }}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicPreferences;

import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  ages,
  drinkingHabits,
  eatingHabits,
  maritalStatuses,
  physicalStatus,
  smokingHabits,languages
} from "./allOptions";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { heights } from "../CreateProfile/heights";

const BasicPreferences = ({ gender, formData, setFormData }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // universal handler for direct fields
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // for nested fields like age, height
  const handleNestedChange = (field, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  // handler for multi-selects like marital status, drinking, smoking
  const handleMultiSelectChange = (field, newValue, options) => {
    if (newValue.includes("Any") || newValue.includes("Doesn't matter")) {
      setFormData((prev) => ({
        ...prev,
        [field]: options,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: newValue,
      }));
    }
  };

  return (
    <div className="flex">
      <i className="ri-file-list-3-line text-4xl mt-3 text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 rounded-r-2xl rounded-bl-2xl p-1"></i>
      <div className=" w-2xl px-4 py-4 ">
        <p className="text-xl font-semibold mb-4">Basic Preferences</p>
        <div className="space-y-4">
          {/* Age */}
          <div className="w-full">
            <label>{gender === "Male" ? "Bride" : "Groom"}'s Age</label>
            <div className="flex justify-between">
              <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
                <InputLabel>From</InputLabel>
                <Select
                  value={formData.age.from}
                  onChange={(e) =>
                    handleNestedChange("age", "from", e.target.value)
                  }
                >
                  {ages.map((age, index) => (
                    <MenuItem key={index} value={age}>
                      {age}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
                <InputLabel>To</InputLabel>
                <Select
                  value={formData.age.to}
                  onChange={(e) =>
                    handleNestedChange("age", "to", e.target.value)
                  }
                >
                  {ages.map((age, index) => (
                    <MenuItem key={index} value={age}>
                      {age}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Height */}
          <div className="w-full">
            <label>Height</label>
            <div className="flex justify-between">
              <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
                <InputLabel>From</InputLabel>
                <Select
                  value={formData.height.from}
                  onChange={(e) =>
                    handleNestedChange("height", "from", e.target.value)
                  }
                >
                  {heights.slice(1).map((h, index) => (
                    <MenuItem key={index} value={h}>
                      {h}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ mt: 1, minWidth: 300 }}>
                <InputLabel>To</InputLabel>
                <Select
                  value={formData.height.to}
                  onChange={(e) =>
                    handleNestedChange("height", "to", e.target.value)
                  }
                >
                  {heights.slice(1).map((h, index) => (
                    <MenuItem key={index} value={h}>
                      {h}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Marital Status */}
          <div className="w-full">
            <p className="mb-3">Marital Status</p>
            <Autocomplete
              multiple
              options={maritalStatuses}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              value={formData.maritalStatus || []}
              onChange={(event, newValue) =>
                handleMultiSelectChange(
                  "maritalStatus",
                  newValue,
                  maritalStatuses
                )
              }
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              style={{ width: 650 }}
              renderInput={(params) => <TextField {...params} />}
            />
            
          </div>

          {/* Mother Tongue */}
          <div className="w-full">
            <p className="mb-3">Mother Tongue</p>
            <Autocomplete
              multiple
              options={languages}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              value={formData.motherTongue || []}
              onChange={(event, newValue) =>
                handleChange("motherTongue", newValue)
              }
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              style={{ width: 650 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          {/* Physical Status */}
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

          {/* Eating Habits */}
          <div className="w-full">
            <p className="mb-3">Eating Habits</p>
            <Autocomplete
              multiple
              options={eatingHabits}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              value={formData.eatingHabits || []}
              onChange={(event, newValue) =>
                handleMultiSelectChange(
                  "eatingHabits",
                  newValue,
                  eatingHabits
                )
              }
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              style={{ width: 650 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          {/* Drinking Habits */}
          <div className="w-full">
            <p className="mb-3">Drinking Habits</p>
            <Autocomplete
              multiple
              options={drinkingHabits}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              value={formData.drinkingHabits || []}
              onChange={(event, newValue) =>
                handleMultiSelectChange(
                  "drinkingHabits",
                  newValue,
                  drinkingHabits
                )
              }
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              style={{ width: 650 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          {/* Smoking Habits */}
          <div className="w-full">
            <p className="mb-3">Smoking Habits</p>
            <Autocomplete
              multiple
              options={smokingHabits}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              value={formData.smokingHabits || []}
              onChange={(event, newValue) =>
                handleMultiSelectChange(
                  "smokingHabits",
                  newValue,
                  smokingHabits
                )
              }
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                );
              }}
              style={{ width: 650 }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPreferences;
