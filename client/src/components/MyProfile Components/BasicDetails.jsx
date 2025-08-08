import React, { useEffect, useState } from "react";
import { calculateAge } from "./ageCalculate";
import EditBasicDetails from "./Edit/EditBasicDetails";
import weights from "./weight";

const BasicDetails = ({ userData, userInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bodyType: userInfo.bodyType || "",
    drinkingHabit: "",
    smokingHabit: "",
    physicalStatus: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        bodyType: userInfo.bodyType || "",
        drinkingHabit: userInfo.drinkingHabit || "",
        smokingHabit: userInfo.smokingHabit || "",
        physicalStatus: userInfo.physicalStatus||"",
      });
    }
  }, [userInfo]);

  const [add, setAdd] = useState({
    openBodyType: false,
    openPhysicalStatus: false,
    openWeight: false,
    openDrinkingHabit: false,
    openSmokingHabit: false,
  });
  const cancelAction = () => {
    setAdd({
      ...add,
      openBodyType: false,
      openPhysicalStatus: false,
      openWeight: false,
      openDrinkingHabit: false,
      openSmokingHabit: false,
    });
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className={`profileComponent !gap-0   `}>
      <div
        className={` transition-all duration-1000 overflow-hidden ${
          isEditing ? "opacity-0 translate-y-20" : "opacity-100 translate-y-0"
        }`}
      >
        {!isEditing && (
          <div className="space-y-4">
            {" "}
            <div className="space-y-2">
              {" "}
              <div className="flex w-full justify-between items-center">
                <p className="text-xl font-normal text-gray-400">
                  Basic Details{" "}
                </p>
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setAdd({
                      ...add,
                      openBodyType: false,
                      openPhysicalStatus: false,
                      openWeight: false,
                      openDrinkingHabit: false,
                      openSmokingHabit: false,
                    });
                  }}
                  className="bg-blue-500 text-white px-1 text-sm rounded-sm cursor-pointer"
                >
                  <span>
                    <i class="ri-pencil-fill"></i>
                  </span>{" "}
                  Edit
                </button>
              </div>
              <div className="space-y-1">
                <p>Get better responses by verifying your name and age</p>
                <button className="bg-amber-500 text-white px-2 py-1 rounded-sm cursor-pointer">
                  Get Identity Badge{" "}
                  <span>
                    <i class="ri-arrow-right-s-line"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-gray-400"></div>
            <div className="flex w-full gap-20 items-center relative">
              <div className="w-1/2 flex gap-7">
                <div className="space-y-1 ">
                  <div className="py-1">Profile created for</div>
                  <div className="py-1">Body Type</div>
                  <div className="py-1">Physical Status</div>
                  <div className="py-1">Weight</div>    
                  <div className="py-1">Marital Status</div>
                  <div className="py-1">Drinking Habits</div>
                </div>

                <div className="space-y-1">
                  <div className="py-1">: {userData.createdFor}</div>
                  <div className="py-1">
                    :
                    {formData.bodyType ? (
                      <span> {formData.bodyType}</span>
                    ) : (
                      <span
                        onClick={() => {
                          setAdd({
                            ...add,
                            openBodyType: true,
                            openPhysicalStatus: false,
                            openWeight: false,
                            openDrinkingHabit: false,
                            openSmokingHabit: false,
                          });
                        }}
                        className="text-blue-500 text-center text-sm cursor-pointer"
                      >
                        <span> Add Body Type</span>{" "}
                        <i className="ri-arrow-right-s-fill "></i>
                      </span>
                    )}
                    {add.openBodyType && (
                      <div className="absolute top-16.5 w-85 h-35 shadow-[4px_4px_5px_rgba(1,1,1,0.6)]  bg-gray-50 border-2 border-purple-400 rounded-md">
                        <i class="ri-arrow-up-s-fill absolute -top-5 text-2xl text-purple-500"></i>
                        <div className="flex justify-end w-full p-1">
                          <i
                            onClick={() => {
                              cancelAction();
                            }}
                            className="ri-close-line text-gray-400 flex items-center justify-center border-1 border-gray-500 h-4 w-4 cursor-pointer"
                          ></i>
                        </div>
                        <div className="p-3 space-y-3">
                          <p>Body Type :</p>
                          {["Slim", "Athletic", "Average", "Heavy"].map(
                            (type) => (
                              <label key={type} className="mr-2">
                                <input
                                  className="mr-1"
                                  type="radio"
                                  name="bodyType"
                                  value={type}
                                  checked={formData.bodyType === type}
                                  onChange={() =>
                                    handleChange("bodyType", type)
                                  }
                                />
                                {type}
                              </label>
                            )
                          )}
                          <div className="flex justify-end mt-2 gap-2">
                            <button className="border-1 border-gray-300 rounded-md px-2 cursor-pointer">
                              Save
                            </button>
                            <button
                              onClick={() => {
                                cancelAction();
                              }}
                              className="border-1 border-gray-300 rounded-md px-2 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-1">
                    :{" "}
                    {formData.physicalStatus ? (
                      <span> {formData.physicalStatus}</span>
                    ) : (
                      <span
                        onClick={() => {
                          setAdd({
                            ...add,
                            openBodyType: false,
                            openPhysicalStatus: true,
                            openWeight: false,
                            openDrinkingHabit: false,
                            openSmokingHabit: false,
                          });
                        }}
                        className="text-blue-500 text-center text-sm cursor-pointer"
                      >
                        <span> Add Physical Status</span>{" "}
                        <i className="ri-arrow-right-s-fill "></i>
                      </span>
                    )}
                    {add.openPhysicalStatus && (
                      <div className="absolute -top-16 w-85 h-35 shadow-[4px_0px_5px_rgba(1,1,1,0.6)]  bg-gray-50 border-2 border-purple-400 rounded-md">
                        <i class="ri-arrow-down-s-fill absolute -bottom-5 text-2xl text-purple-500"></i>
                        <div className="flex justify-end w-full p-1">
                          <i
                            onClick={() => {
                              cancelAction();
                            }}
                            className="ri-close-line text-gray-400 flex items-center justify-center border-1 border-gray-500 h-4 w-4 cursor-pointer"
                          ></i>
                        </div>
                        <div className="p-3 space-y-3">
                          <p>Physical Status :</p>
                          {["Normal", "Physically Challanged"].map((type) => (
                            <label key={type} className=" mr-2">
                              <input
                                className="mr-1"
                                type="radio"
                                name="physicalStatus "
                                value={type}
                                checked={formData.physicalStatus === type}
                                onChange={() =>
                                  handleChange("physicalStatus", type)
                                }
                              />
                              {type}
                            </label>
                          ))}
                          <div className="flex justify-end mt-2 gap-2">
                            <button className="border-1 border-gray-300 rounded-md px-2 ">
                              Save
                            </button>
                            <button
                              onClick={() => {
                                cancelAction();
                              }}
                              className="border-1 border-gray-300 rounded-md px-2 "
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-1">
                    :
                    {formData.weight ? (
                      <span> {formData.weight}</span>
                    ) : (
                      <span
                        onClick={() => {
                          setAdd({
                            ...add,
                            openBodyType: false,
                            openPhysicalStatus: false,
                            openWeight: true,
                            openDrinkingHabit: false,
                            openSmokingHabit: false,
                          });
                        }}
                        className="text-blue-500 text-center text-sm cursor-pointer"
                      >
                        <span> Add Weight</span>{" "}
                        <i className="ri-arrow-right-s-fill "></i>
                      </span>
                    )}
                    {add.openWeight && (
                      <div className="absolute -top-6 w-85 h-35 shadow-[4px_0px_5px_rgba(1,1,1,0.6)]  bg-gray-50 border-2 border-purple-400 rounded-md">
                        <i class="ri-arrow-down-s-fill absolute -bottom-5 text-2xl text-purple-500"></i>
                        <div className="flex justify-end w-full p-1">
                          <i
                            onClick={() => {
                              cancelAction();
                            }}
                            className="ri-close-line text-gray-400 flex items-center justify-center border-1 border-gray-500 h-4 w-4 cursor-pointer"
                          ></i>
                        </div>
                        <div className="p-3 space-y-1">
                          <p>Weight:</p>
                          <select
                            value={formData.weight}
                            onChange={(e) =>
                              handleChange("weight", e.target.value)
                            }
                            className="border border-gray-300 rounded-md px-2 py-1"
                          >
                            <option value="">Select Weight</option>
                            {weights.map((weight) => (
                              <option key={weight} value={weight}>
                                {weight}
                              </option>
                            ))}
                          </select>

                          <div className="flex justify-end  gap-2">
                            <button className="border border-gray-300 rounded-md px-2">
                              Save
                            </button>
                            <button
                              onClick={() => cancelAction()}
                              className="border border-gray-300 rounded-md px-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-1">: {userInfo.maritalStatus}</div>
                  <div className="py-1">
                    :
                    {/* {userInfo.drinkingHabits ? (
                      <span> {userInfo.drinkingHabits}</span>
                    ) : ( */}
                    {formData.drinkingHabit ? (
                      <span> {formData.drinkingHabit}</span>
                    ) : (
                      <span
                        onClick={() => {
                          setAdd({
                            ...add,
                            openBodyType: false,
                            openPhysicalStatus: false,
                            openWeight: false,
                            openDrinkingHabit: true,
                            openSmokingHabit: false,
                          });
                        }}
                        className="text-blue-500 text-center text-sm cursor-pointer "
                      >
                        <span> Add Drinking Habits</span>{" "}
                        <i className="ri-arrow-right-s-fill "></i>
                      </span>
                    )}
                    {add.openDrinkingHabit && (
                      <div className="absolute top-12 w-85 h-35 shadow-[4px_0px_5px_rgba(1,1,1,0.6)]  bg-gray-50 border-2 border-purple-400 rounded-md">
                        <i class="ri-arrow-down-s-fill absolute -bottom-5 text-2xl text-purple-500"></i>
                        <div className="flex justify-end w-full p-1">
                          <i
                            onClick={() => {
                              cancelAction();
                            }}
                            className="ri-close-line text-gray-400 flex items-center justify-center border-1 border-gray-500 h-4 w-4 cursor-pointer"
                          ></i>
                        </div>
                        <div className="p-3 space-y-1">
                          <p>Drinking Habits:</p>
                          {["Yes", "No", "Occasionally"].map((type) => (
                            <label key={type} className="mr-2">
                              <input
                                className="mr-1"
                                type="radio"
                                name="drinkingHabit"
                                value={type}
                                checked={formData.drinkingHabit === type}
                                onChange={() =>
                                  handleChange("drinkingHabit", type)
                                }
                              />
                              {type}
                            </label>
                          ))}

                          <div className="flex justify-end mt-3 gap-2">
                            <button className="border border-gray-300 rounded-md px-2">
                              Save
                            </button>
                            <button
                              onClick={() => cancelAction()}
                              className="border border-gray-300 rounded-md px-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-1/2 flex justify-between">
                <div className="space-y-1">
                  <div className="py-1">Name</div>
                  <div className="py-1">Age</div>
                  <div className="py-1">Height</div>
                  <div className="py-1">Mother Tongue</div>
                  <div className="py-1">Eating Habits</div>
                  <div className="py-1">Smoking Habits</div>
                </div>
                <div className="space-y-1">
                  <div className="py-1">
                    : {userData.firstName + " " + userData.lastName}
                  </div>{" "}
                  <div className="py-1">
                    : {calculateAge(userData.dob)} Years - Verify
                  </div>
                  <div className="py-1">: {userInfo.height}</div>{" "}
                  <div className="py-1">: {userInfo.languageKnown}</div>{" "}
                  <div className="py-1">: {userInfo.diet}</div>{" "}
                  <div className="py-1">
                    :
                    {formData.smokingHabit ? (
                      <span> {formData.smokingHabit}</span>
                    ) : (
                      <span
                        onClick={() => {
                          setAdd({
                            ...add,
                            openBodyType: false,
                            openPhysicalStatus: false,
                            openWeight: false,
                            openDrinkingHabit: false,
                            openSmokingHabit: true,
                          });
                        }}
                        className="text-blue-500 text-center text-sm cursor-pointer"
                      >
                        <span> Add smoking Habits</span>{" "}
                        <i className="ri-arrow-right-s-fill "></i>
                      </span>
                    )}
                    {add.openSmokingHabit && (
                      <div className="absolute top-12 right-10 w-85 h-35 shadow-[4px_0px_5px_rgba(1,1,1,0.6)]  bg-gray-50 border-2 border-purple-400 rounded-md">
                        <i class="ri-arrow-down-s-fill absolute -bottom-5 right-0 text-2xl text-purple-500"></i>
                        <div className="flex justify-end w-full p-1">
                          <i
                            onClick={() => {
                              cancelAction();
                            }}
                            className="ri-close-line text-gray-400 flex items-center justify-center border-1 border-gray-500 h-4 w-4 cursor-pointer"
                          ></i>
                        </div>
                        <div className="p-3 space-y-1">
                          <p>Smoking Habits:</p>
                          {["Yes", "No", "Occasionally"].map((type) => (
                            <label key={type} className="mr-2">
                              <input
                                className="mr-1"
                                type="radio"
                                name="smokingHabit"
                                value={type}
                                checked={formData.smokingHabit === type}
                                onChange={() =>
                                  handleChange("smokingHabit", type)
                                }
                              />
                              {type}
                            </label>
                          ))}

                          <div className="flex justify-end mt-3 gap-2">
                            <button className="border border-gray-300 rounded-md  px-2">
                              Save
                            </button>
                            <button
                              onClick={() => cancelAction()}
                              className="border border-gray-300 rounded-md px-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {
        <EditBasicDetails
          userData={userData}
          userInfo={userInfo}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      }
    </div>
  );
};

export default BasicDetails;

// import React, { useEffect, useState } from "react";
// import { calculateAge } from "./ageCalculate";

// const BasicDetails = ({ userData, userInfo, onSave }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     createdFor: "",
//     height: "",
//     weight: "",
//     maritalStatus: "",
//     bodyType: "",
//     eatingHabits: [],
//     drinkingHabits: [],
//     smokingHabit: [],
//   });

//   // Update formData when props change
//   useEffect(() => {
//     if (userData && userInfo) {
//       setFormData({
//         name: `${userData.firstName} ${userData.lastName}`,
//         age: calculateAge(userData.dob),
//         createdFor: userData.createdFor || "",
//         height: userInfo.height || "",
//         weight: userInfo.weight || "",
//         maritalStatus: userInfo.maritalStatus || "",
//         bodyType: userInfo.bodyType || "",
//         eatingHabits: [],
//         drinkingHabits: [],
//         smokingHabit: [],
//       });
//     }
//   }, [userData, userInfo]);

//   // Handlers
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleArrayToggle = (field, value) => {
//     setFormData((prev) => {
//       const updatedArray = prev[field].includes(value)
//         ? prev[field].filter((v) => v !== value)
//         : [...prev[field], value];
//       return { ...prev, [field]: updatedArray };
//     });
//   };

//   const handleSave = () => {
//     if (onSave) onSave(formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className="profileComponent">
//       <div className="flex w-full justify-between items-center mb-2">
//         <p className="text-xl font-normal text-gray-400">Basic Details</p>
//         <button
//           className="bg-blue-500 text-white px-2 py-1 text-sm rounded-sm cursor-pointer"
//           onClick={() => setIsEditing(!isEditing)}
//         >
//           <i className={`ri-${isEditing ? "close-line" : "pencil-fill"}`}></i>{" "}
//           {isEditing ? "Close" : "Edit"}
//         </button>
//       </div>

//       {/* Slide-up Transition Section */}
//       <div
//         className={`transition-all duration-700 overflow-hidden ${
//           isEditing
//             ? "max-h-[800px] opacity-100 translate-y-0"
//             : "max-h-0 opacity-0 translate-y-10"
//         }`}
//       >
//         <div className="space-y-4 mt-4">

//           {/* Name */}
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => handleChange("name", e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-sm"
//             placeholder="Name"
//           />

//           {/* Age */}
//           <input
//             type="number"
//             value={formData.age}
//             onChange={(e) => handleChange("age", e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-sm"
//             placeholder="Age"
//           />

//           {/* Created For */}
//           <select
//             value={formData.createdFor}
//             onChange={(e) => handleChange("createdFor", e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-sm"
//           >
//             <option value="">Select Profile Created For</option>
//             <option value="Self">Self</option>
//             <option value="Son">Son</option>
//             <option value="Daughter">Daughter</option>
//           </select>

//           {/* Height */}
//           <select
//             value={formData.height}
//             onChange={(e) => handleChange("height", e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-sm"
//           >
//             <option value="">Select Height</option>
//             <option value="5'0">5'0"</option>
//             <option value="5'5">5'5"</option>
//             <option value="6'0">6'0"</option>
//           </select>

//           {/* Weight */}
//           <select
//             value={formData.weight}
//             onChange={(e) => handleChange("weight", e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-sm"
//           >
//             <option value="">Select Weight</option>
//             <option value="50">50kg</option>
//             <option value="60">60kg</option>
//             <option value="70">70kg</option>
//           </select>

//           {/* Marital Status */}
//           <select
//             value={formData.maritalStatus}
//             onChange={(e) => handleChange("maritalStatus", e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-sm"
//           >
//             <option value="">Select Marital Status</option>
//             <option value="Single">Single</option>
//             <option value="Married">Married</option>
//           </select>

//           {/* Body Type (Radio) */}
//           <div className="space-y-1">
//             <p>Body Type:</p>
//             {["Slim", "Athletic", "Average", "Heavy"].map((type) => (
//               <label key={type} className="mr-4">
//                 <input
//                   type="radio"
//                   name="bodyType"
//                   value={type}
//                   checked={formData.bodyType === type}
//                   onChange={() => handleChange("bodyType", type)}
//                 />{" "}
//                 {type}
//               </label>
//             ))}
//           </div>

//           {/* Eating Habits (Checkboxes) */}
//           <div className="space-y-1">
//             <p>Eating Habits:</p>
//             {["Vegetarian", "Non-Vegetarian", "Occasionally Non-Veg"].map(
//               (habit) => (
//                 <label key={habit} className="mr-4">
//                   <input
//                     type="checkbox"
//                     value={habit}
//                     checked={formData.eatingHabits.includes(habit)}
//                     onChange={() => handleArrayToggle("eatingHabits", habit)}
//                   />{" "}
//                   {habit}
//                 </label>
//               )
//             )}
//           </div>

//           {/* Drinking & Smoking Habits (Checkboxes) */}
//           <div className="space-y-1">
//             <p>Drinking Habits:</p>
//             {["Yes", "No", "Occasionally"].map((habit) => (
//               <label key={habit} className="mr-4">
//                 <input
//                   type="checkbox"
//                   value={habit}
//                   checked={formData.drinkingHabits.includes(habit)}
//                   onChange={() => handleArrayToggle("drinkingHabits", habit)}
//                 />{" "}
//                 {habit}
//               </label>
//             ))}
//           </div>

//           <div className="space-y-1">
//             <p>Smoking Habits:</p>
//             {["Yes", "No", "Occasionally"].map((habit) => (
//               <label key={habit} className="mr-4">
//                 <input
//                   type="checkbox"
//                   value={habit}
//                   checked={formData.smokingHabit.includes(habit)}
//                   onChange={() => handleArrayToggle("smokingHabit", habit)}
//                 />{" "}
//                 {habit}
//               </label>
//             ))}
//           </div>

//           {/* Save & Cancel Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               onClick={handleSave}
//               className="bg-amber-500 text-white px-4 py-1 rounded-sm"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="border border-gray-300 text-gray-800 px-4 py-1 rounded-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicDetails;
