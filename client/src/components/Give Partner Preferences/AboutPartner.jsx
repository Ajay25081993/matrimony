import { TextareaAutosize } from "@mui/material";
import React from "react";

const AboutPartner = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      aboutPartner: e.target.value,
    }));
  };

  return (
    <div className="flex">
      <i
        className="ri-user-search-line text-4xl mt-3
          text-white border border-violet-500 shadow-sm shadow-violet-500 bg-purple-300 h-12 
          rounded-r-2xl rounded-bl-2xl p-1"
      ></i>
      <div className="w-2xl px-4 py-4">
        <p className="text-xl font-semibold mb-4">What we are looking for</p>

        <div className="space-y-4">
          <div className="w-full">
            <TextareaAutosize
              aria-label="about partner textarea"
              placeholder="Write about partner preferences..."
              value={formData.aboutPartner || ""}
              onChange={handleChange}
              style={{ width: 650, height: 100 }}
              className="resize-none border-1 rounded-md p-2 border-gray-400 outline-sky-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPartner;
