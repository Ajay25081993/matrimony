// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../lib/axios";
// import { API_URLS } from "../../constants/apiUrls";
// import { Eye, EyeOff } from "lucide-react"; // 👈 import icons
// import { showErrorToast } from "../../lib/toast";

// const EditMail = ({ loggedInUserData, fetchData }) => {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState("");
//   const [showPasswordInput, setShowPasswordInput] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("")
//   const submitEmail = async () => {
//     try {
//       const response = await axiosInstance.put(
//         `${API_URLS.UPDATE_USER_BY_ID}/${loggedInUserData.id}`,
//         { email: email }
//       );
//       console.log(response);

//       if (response.message.endsWith("Updated")) {
//         fetchData();
//         setPassword("");
//         setShowPasswordInput(false);
//       } else {
//         showErrorToast(response.message);
//       }
//     } catch (error) {
//       showErrorToast(error.message);
//       console.error(error.data[0].msg);
//     }
//   };

//   const checkPassword = async () => {
//     try {
//       const response = await axiosInstance.post(
//         `${API_URLS.CHECK_PASSWORD}/${loggedInUserData.id}`,
//         { password }
//       );
//       if (response.message.endsWith("matched")) {
//         submitEmail();
//       } else {
//         setError(response.message)
//         showErrorToast(response.message);
//       }
//     } catch (error) {
//       setError(error.data[0].msg)
//       console.log(error);
//       showErrorToast(error.message);
//     }
//   };

//   useEffect(() => {
//     setEmail(loggedInUserData?.email);
//   }, [loggedInUserData]);

//   return (
//     <div className="bg-white py-3 px-4">
//       <div>
//         <p className="font-semibold text-xl">Edit e-mail Address</p>
//         <hr className="border-dotted border-gray-300 w-3/4 mb-3" />
//         <p className="text-sm ml-2 mb-4">
//           A valid E-mail id will be used to send you partner search mailers,
//           member-to-member communication, and special offers.
//         </p>
//       </div>

//       <div className="flex gap-3 ml-2">
//         {showPasswordInput ? (
//           <div className="flex gap-4">
//             <div className="flex flex-col relative">
//               <label htmlFor="password">Password</label>

//               <input
//                 id="password"
//                 className="w-60 p-1 border border-gray-300 placeholder:text-gray-400 rounded-sm outline-0 pr-8"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {/* Eye icon toggle */}
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-8 text-gray-600 hover:text-gray-800"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//               {error&&<p className="text-sm text-red-500">{error}</p>}
//             </div>

//             <div className={`${error?"mt-0.5 items-center":"mb-0.5 items-end"} flex gap-3 `}>
//               <button
//                 onClick={checkPassword}
//                 className="bg-[#c1239ee2] p-1 rounded text-center h-8 w-12 text-white font-semibold hover:bg-[#862471] cursor-pointer"
//               >
//                 Save
//               </button>

//               <button
//                 onClick={() => setPassword("")}
//                 className="bg-purple-300 p-1 rounded text-center w-12 h-8 text-white font-semibold hover:bg-purple-400 cursor-pointer"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="flex gap-4">
//             <div className="flex flex-col">
//               <input
//                 className="w-60 p-1 border border-gray-300 placeholder:text-gray-400 rounded-sm outline-0"
//                 type="text"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-3 items-end mb-1">
//               <button
//                 onClick={() => setShowPasswordInput(true)}
//                 className="bg-[#c1239ee2] p-1 rounded text-center h-8 w-12 text-white font-semibold hover:bg-[#862471] cursor-pointer"
//               >
//                 Save
//               </button>

//               <button
//                 onClick={() => setEmail(loggedInUserData.email)}
//                 className="bg-purple-300 p-1 rounded text-center w-12 h-8 text-white font-semibold hover:bg-purple-400 cursor-pointer"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditMail;
import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { Eye, EyeOff } from "lucide-react";
import { showErrorToast } from "../../lib/toast";

const EditMail = ({ loggedInUserData, fetchData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setEmail(loggedInUserData?.email);
  }, [loggedInUserData]);

  const validateEmail = (email) => {
    // Simple clean email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const submitEmail = async () => {
    try {
      const response = await axiosInstance.put(
        `${API_URLS.UPDATE_USER_BY_ID}/${loggedInUserData.id}`,
        { email }
      );
      console.log(response);

      if (response.message.endsWith("Updated")) {
        fetchData();
        setPassword("");
        setShowPasswordInput(false);
        setEmailError("");
      } else {
        showErrorToast(response.message);
      }
    } catch (error) {
      showErrorToast(error.message);
      console.error(error.data?.[0]?.msg);
    }
  };

  const checkPassword = async () => {
    try {
      const response = await axiosInstance.post(
        `${API_URLS.CHECK_PASSWORD}/${loggedInUserData.id}`,
        { password }
      );
      if (response.message.endsWith("matched")) {
        submitEmail();
      } else {
        setError(response.message);
        showErrorToast(response.message);
      }
    } catch (error) {
      setError(error.data?.[0]?.msg);
      console.log(error);
      showErrorToast(error.message);
    }
  };

  const handleEmailSaveClick = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setShowPasswordInput(true);
  };

  return (
    <div className="bg-white h-45 py-3 px-4">
      <div>
        <p className="font-semibold text-xl">Edit e-mail Address</p>
        <hr className="border-dotted border-gray-300 w-3/4 mb-3" />
        <p className="text-sm ml-2 mb-4">
          A valid E-mail id will be used to send you partner search mailers,
          member-to-member communication, and special offers.
        </p>
      </div>

      <div className="flex gap-3 ml-2">
        {showPasswordInput ? (
          <div className="flex gap-4">
            {!error&&<div className="flex flex-col relative">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="w-60 p-1 border border-gray-300 placeholder:text-gray-400 rounded-sm outline-0 pr-8"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              
            </div>}

            <div
              className={`${
                error ? "mt-0.5 items-center" : "mb-0.5 items-end"
              } flex gap-3`}
            >
              {error ? (<>
                <p className="text-sm text-red-500">{error}</p>
                <button
                  onClick={() =>{ 
                    setPassword("")
                    setError("")
                    setShowPasswordInput(false)}}
                  className="bg-purple-300 p-1 rounded text-center w-12 h-8 text-white font-semibold hover:bg-purple-400 cursor-pointer"
                >
                  Close
                </button></>
              ) : (
                <>
                  <button
                    onClick={checkPassword}
                    className="bg-[#c1239ee2] p-1 rounded text-center h-8 w-12 text-white font-semibold hover:bg-[#862471] cursor-pointer"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setPassword("")}
                    className="bg-purple-300 p-1 rounded text-center w-12 h-8 text-white font-semibold hover:bg-purple-400 cursor-pointer"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="flex flex-col relative">
              <input
                className="w-60 p-1 border border-gray-300 placeholder:text-gray-400 rounded-sm outline-0"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-sm text-red-500 absolute -bottom-5">
                  {emailError}
                </p>
              )}
            </div>
            <div className="flex gap-3 items-end mb-1">
              <button
                onClick={handleEmailSaveClick}
                className="bg-[#c1239ee2] p-1 rounded text-center h-8 w-12 text-white font-semibold hover:bg-[#862471] cursor-pointer"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setEmail(loggedInUserData.email);
                  setEmailError("");
                }}
                className="bg-purple-300 p-1 rounded text-center w-12 h-8 text-white font-semibold hover:bg-purple-400 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMail;
