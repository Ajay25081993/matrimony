import React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { religions } from "../../pages/Register/religions";
import { dosh, rashi, star, subCommunity } from "./allOptions";

const ReligiousPreferences = ({ formData, setFormData }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // Single-value handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Multi-select handler with 'Any' / 'Doesn't matter' logic
  const handleMultiSelectWithAny = (field, newValue, allOptions) => {
    if (newValue.includes("Any") || newValue.includes("Doesn't matter")) {
      setFormData((prev) => ({
        ...prev,
        [field]: allOptions,
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
      <i className="ri-book-open-line text-4xl mt-3 text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 rounded-r-2xl rounded-bl-2xl p-1"></i>

      <div className="w-full p-4">
        <p className="text-xl font-semibold mb-4">Religious Preferences</p>
        <div className="space-y-4">
          {/* Religion */}
          <div className="w-full">
            <label>Religion</label>
            <FormControl variant="standard" sx={{ mt: 1, minWidth: 650 }}>
              <Select
                value={formData.religion || ""}
                onChange={(e) => handleChange("religion", e.target.value)}
                MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
              >
                {religions.slice(2).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* If Religion is Hindu */}
          {formData.religion === "Hindu" && (
            <>
              {/* Caste */}

              <div className="w-full">
                <p className="mb-3">Caste</p>
                <Autocomplete
                  multiple
                  id="checkboxes-caste-demo"
                  options={subCommunity}
                  disableCloseOnSelect
                  value={formData.caste || []}
                  onChange={(event, newValue) => {
                    handleMultiSelectWithAny("caste", newValue, subCommunity);
                  }}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                      <li key={key} {...optionProps}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    );
                  }}
                  style={{ width: 650 }}
                  renderInput={(params) => (
                    <TextField {...params} label="" placeholder="" />
                  )}
                />
              </div>

              {/* Dosh */}
              {/* <div className="w-full">
                <p className="mb-3">Dosh</p>
                <Autocomplete
                  multiple
                  options={dosh}
                  disableCloseOnSelect
                  value={formData.dosh || []}
                  onChange={(event, newValue) =>
                    handleMultiSelectWithAny("dosh", newValue, dosh)
                  }
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
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
                  style={{ width: 650 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div> */}

              {/* Star */}
              <div className="w-full">
                <p className="mb-3">Star</p>
                <Autocomplete
                  multiple
                  options={star}
                  disableCloseOnSelect
                  value={formData.star || []}
                  onChange={(event, newValue) =>
                    handleMultiSelectWithAny("star", newValue, star)
                  }
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
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
                  style={{ width: 650 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>

              {/* Rashi */}
              <div className="w-full">
                <p className="mb-3">Rashi</p>
                <Autocomplete
                  multiple
                  options={rashi}
                  disableCloseOnSelect
                  value={formData.rashi || []}
                  onChange={(event, newValue) =>
                    handleMultiSelectWithAny("rashi", newValue, rashi)
                  }
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
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
                  style={{ width: 650 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReligiousPreferences;
