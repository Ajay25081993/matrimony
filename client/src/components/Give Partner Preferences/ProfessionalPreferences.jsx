import { degrees, employedIn, professions } from "./allOptions";
import { yearlyIncome } from "../CreateProfile/income";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const ProfessionalPreferences = ({ formData, setFormData }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // single value handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // multi-select handler with 'Any' / 'Doesn't matter' logic
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
      <i className="ri-briefcase-line text-4xl mt-3 text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 rounded-r-2xl rounded-bl-2xl p-1"></i>

      <div className="w-2xl px-4 py-4">
        <p className="text-xl font-semibold mb-4">Professional Preferences</p>
        <div className="space-y-4">

          {/* Education */}
          <div className="w-full">
            <p className="mb-3">Education</p>
            <Autocomplete
              multiple
              options={degrees}
              disableCloseOnSelect
              value={formData.education || []}
              onChange={(event, newValue) =>
                handleMultiSelectWithAny("education", newValue, degrees)
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
              renderInput={(params) => <TextField {...params} placeholder="🔍 Search Qualifications..."/>}
            />
          </div>

          {/* Employed In */}
          <div className="w-full">
            <p className="mb-3">Employed In</p>
            <Autocomplete
              multiple
              options={employedIn}
              disableCloseOnSelect
              value={formData.workIn || []}
              onChange={(event, newValue) =>
                handleMultiSelectWithAny("workIn", newValue, employedIn)
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
              renderInput={(params) => <TextField {...params} placeholder="🔍 Search Field..."/>}
            />
          </div>

          {/* Occupation */}
          <div className="w-full">
            <p className="mb-3">Occupation</p>
            <Autocomplete
              multiple
              options={professions}
              disableCloseOnSelect
              value={formData.workAs || []}
              onChange={(event, newValue) =>
                handleMultiSelectWithAny("workAs", newValue, professions)
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
              renderInput={(params) => <TextField {...params} placeholder="🔍 Search Occupation..."/>}
            />
          </div>

          {/* Annual Income */}
          <div className="w-full">
            <label>Annual Income</label>
            <FormControl variant="standard" sx={{ mt: 0, minWidth: 650 }}>
              <Select
                value={formData.income || ""}
                onChange={(e) => handleChange("income", e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: { maxHeight: 300 },
                  },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {yearlyIncome.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfessionalPreferences;
