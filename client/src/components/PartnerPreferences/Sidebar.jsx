import React from "react";
import { allFields } from "./field";

const Sidebar = ({ onOptionClick }) => {
  return (
    <div className="rounded-sm w-65 border-1 fixed top-37 left-40  bg-[#a261fc] p-6 text-white h-150">
      <div className="space-y-10">
        <div className="text-sm font-semibold mb-2 flex gap-2 items-center">
          <i className="ri-hearts-line text-2xl"></i>
          <p>PARTNER PREFERENCES</p>
        </div>

        <div className="text-left ml-5 mt-5 space-y-6">
          {allFields.map((field, idx) => (
            <div
              key={idx}
              className="hover:text-violet-900 cursor-pointer scroll-mt-[120px]"
              onClick={() => onOptionClick(field.mainHeading)}
            >
              {field.mainHeading.replace(" Preferences", "")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
