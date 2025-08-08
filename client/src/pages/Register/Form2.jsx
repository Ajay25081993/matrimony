import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { religions } from "./religions";
import { indianStates } from "./states";
import { communities } from "./community";

export default function Form2({ onNext, onBack, userData, setUserData }) {
  // Example for enabling/disabling button based on selections — you can enhance this with validation logic later
  const isValid = userData.religion!=="Select" && userData.community!=='Select' && userData.state!=="Select";

  return (
    <div className="">
      <div className="flex">
        <i
        onClick={onBack}
        className="ri-arrow-left-long-line text-2xl cursor-pointer text-gray-500"
      ></i>

      <div className="w-full flex justify-center mr-5">
        <i className="ri-user-community-line text-green-400 w-18 h-18 text-5xl text-shadow-md text-shadow-green-300 flex justify-center items-center bg-green-200 rounded-full"></i>
      </div>
      </div>
      

      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "70ch" } }}
        noValidate
        autoComplete="off"
      >
        <div className="w-full p-10 flex flex-col justify-center items-center gap-8">
          {/* Religion */}
          <TextField
            id="outlined-select-religion-native"
            select
            label="Religion"
            value={userData.religion}
            onChange={(e) =>
              setUserData({ ...userData, religion: e.target.value })
            }
            slotProps={{
              select: {
                native: true,
              },
            }}
          >
            {religions.map((religion, index) => (
              <option key={index} value={religion}>
                {religion}
              </option>
            ))}
          </TextField>

          {/* Community */}
          <TextField
            id="outlined-select-community-native"
            select
            label="Community"
            value={userData.community}
            onChange={(e) =>
              setUserData({ ...userData, community: e.target.value })
            }
            slotProps={{
              select: {
                native: true,
              },
            }}
          >
            {communities.map((comm, index) => (
              <option key={index} value={comm}>
                {comm}
              </option>
            ))}
          </TextField>

          {/* State */}
          <TextField
            id="outlined-select-state-native"
            select
            label="State"
            value={userData.state}
            onChange={(e) =>
              setUserData({ ...userData, state: e.target.value })
            }
            slotProps={{
              select: {
                native: true,
              },
            }}
          >
            {indianStates.map((st, index) => (
              <option key={index} value={st}>
                {st}
              </option>
            ))}
          </TextField>
        </div>
      </Box>

      {/* Continue Button */}
      <div className="absolute w-full flex justify-center bottom-15 left-0 right-0">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`cursor-pointer px-8 py-3 rounded-full w-1/3 text-2xl  font-semibold  ${
            isValid ? "bg-green-200 text-green-500" : "bg-gray-200 text-white cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
