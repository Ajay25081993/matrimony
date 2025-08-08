import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/loginLogo.png";
import axiosInstance from "../../lib/axios";
import { API_URLS } from "../../constants/apiUrls";
import { showErrorToast, showSuccessToast } from "../../lib/toast";
import { useNavigate } from "react-router-dom";

const Login = ({ showLogin, setShowLogin, setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const navigateTo = useNavigate();
  const passwordWrapperRef = useRef(null);
  //  State for inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // stayLoggedIn: false,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        passwordWrapperRef.current &&
        !passwordWrapperRef.current.contains(event.target)
      ) {
        setShowOutline(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //  Handler for text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  //  Handle login button click
  const handleLogin = async () => {
    console.log("Login data submitted:", formData);
    try {
      const response = await axiosInstance.post(API_URLS.LOGIN, formData);
      console.log("Res", response.data[0].access_token);
      if (response.data[0].access_token) {
        localStorage.setItem("userId", response.data[0].user.id);
        localStorage.setItem("token", response.data[0].access_token);
         localStorage.setItem("gender", response.data[0].user.gender);
        showSuccessToast(response.message, navigateTo, "/home");
      }
    } catch (error) {
      console.log(error);
      showErrorToast("Invalid credentials");
    }
  };

  return (
    <div
      className={`fixed bg-[#00000076] top-0 bottom-0 w-full flex justify-center items-center ${
        showLogin ? "block" : "hidden"
      }`}
    >
      <div className="bg-white shadow-md shadow-gray-800 w-95 py-9 px-6 rounded-md flex flex-col gap-8 border-1 border-gray-200 relative">
        <i
          onClick={() => setShowLogin(false)}
          className="cursor-pointer ri-close-line text-xl absolute right-0 top-0 m-2 text-gray-300 hover:text-gray-400"
        ></i>

        <div className="w-full flex flex-col justify-center items-center gap-2">
          <img src={Logo} alt="" className="w-10" />
          <p>Welcome back! Please Login</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-1">Email ID.</label>
            <input
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="outline-sky-500 w-full p-2 border-1 border-gray-400 rounded-sm"
              type="text"
              placeholder="Enter Email ID"
            />
          </div>

          <div className="flex flex-col ">
            <label className="mb-1">Password</label>
            <div
              ref={passwordWrapperRef}
              onClick={() => setShowOutline(true)}
              className={`${
                showOutline
                  ? "border-2 border-sky-500"
                  : "border-2 border-gray-400"
              } flex items-center   rounded-sm`}
            >
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="outline-0 flex-2 p-2"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 text-gray-500 focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <i className="ri-eye-off-fill"></i>
                ) : (
                  <i className="ri-eye-fill"></i>
                )}
              </button>
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            {/* <div>
              <input
                type="checkbox"
                id="login"
                name="stayLoggedIn"
                checked={formData.stayLoggedIn}
                onChange={handleChange}
              />
              <label htmlFor="login" className="ml-1">
                Stay Logged in
              </label>
            </div> */}
            <p className="text-sky-400 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleLogin}
            className="w-full cursor-pointer bg-sky-400 rounded-md p-2 hover:bg-sky-500"
          >
            Login
          </button>

          <p className="text-center text-gray-400 text-xs font-bold">OR</p>

          <button className="w-full cursor-pointer bg-sky-400 rounded-md p-2 hover:bg-sky-500">
            Login With OTP
          </button>
        </div>

        <div className="flex justify-center items-center">
          <p>New to Shaadi?</p>
          <div
            onClick={() => openRegister()}
            className="px-1 font-semibold text-sm text-gray-500 flex text-center justify-center items-center hover:rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <p>Sign Up Free</p>
            <i className="ri-arrow-right-s-line text-xl mt-1"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
