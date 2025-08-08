import React, { useState } from "react";
import CustomSelect from "./CustomSelect";

const LowerOfUpper = ({ showRegister, setShowRegister }) => {
  const numbers = Array.from({ length: 74 - 21 + 1 }, (_, i) => i + 21);
  const religions = ["Hindu", "Muslim", "Christian", "Sikh"];
  const languages = ["Hindi", "English", "Bengali", "Tamil"];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    gender: "Man",
    ageFrom: 21,
    ageTo: 21,
    religion: "Hindu",
    language: "Hindi",
  });

  const handleToggle = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleSelect = (id, value) => {
    setSelectedValues((prev) => ({ ...prev, [id]: value }));
    setOpenDropdown(null);
  };
  console.log(selectedValues);

  return (
    <div className="text-white lg:py-2">
      <p className="lg:text-4xl text-2xl lg:font-normal font-semibold text-center lg:mb-8 mb-80">
        Trusted Matrimony & Matchmaking Service
      </p>
      <div className="options lg:bg-[#83838340] bg-[#62626239] text-xl flex items-center flex-wrap lg:flex-nowrap space-x-2 pl-2.5 py-10 lg:space-x-2 lg:px-4 lg:py-3 lg:text-lg lg:rounded-md z-10">
        <CustomSelect
          label="I'm looking for a"
          id="gender"
          options={["Man", "Woman"]}
          isOpen={openDropdown === "gender"}
          onToggle={handleToggle}
          selected={selectedValues.gender}
          onSelect={handleSelect}
        />
        <div className="flex gap-1">
          <CustomSelect
            label="aged"
            id="ageFrom"
            options={numbers}
            width="w-24"
            isOpen={openDropdown === "ageFrom"}
            onToggle={handleToggle}
            selected={selectedValues.ageFrom}
            onSelect={handleSelect}
          />

          <p className="mt-7">to</p>

          <CustomSelect
            id="ageTo"
            options={numbers}
            width="w-24 mt-8"
            isOpen={openDropdown === "ageTo"}
            onToggle={handleToggle}
            selected={selectedValues.ageTo}
            onSelect={handleSelect}
          />
        </div>
        <CustomSelect
          label="of religion"
          id="religion"
          options={religions}
          isOpen={openDropdown === "religion"}
          onToggle={handleToggle}
          selected={selectedValues.religion}
          onSelect={handleSelect}
        />

        <CustomSelect
          label="and mother tongue"
          id="language"
          options={languages}
          width="lg:w-62 w-55"
          isOpen={openDropdown === "language"}
          onToggle={handleToggle}
          selected={selectedValues.language}
          onSelect={handleSelect}
        />
        <div className="lg:mt-7 w-full  mt-6">
          <button
            onClick={() => setShowRegister(true)}
            className="cursor-pointer bg-cyan-500 text-white w-97 lg:w-30 p-2 px-4 rounded hover:bg-cyan-600"
          >
            Let's Begin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowerOfUpper;
