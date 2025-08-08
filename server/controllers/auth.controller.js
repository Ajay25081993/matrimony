import { User } from "../models/Schemas.js";
import bcrypt from "bcryptjs";
import { errorResponse, successResponse } from "../helper/responseHelper.js";
import generateToken from "../jwt/token.js";

export const register = async (req, res) => {
  let {
    age,
    community,
    createdFor,
    dob,
    email,
    firstName,
    gender,
    lastName,
    password,
    phoneNo,
    religion,
    state,
  } = req.body;

  try {
    let checkUser = await User.findOne({
      where: {
        email: email,
        is_deleted: 0,
      },
    });

    if (checkUser) return successResponse(res, "User already exists", [], 200);

    const salt = await bcrypt.genSalt(10);
    let encrypted_password = await bcrypt.hash(password, salt);

    let newUser = {
      age,
      community,
      createdFor,
      dob,
      email,
      firstName,
      gender,
      lastName,
      password: encrypted_password,
      phoneNo,
      religion,
      state,
    };

    let result = await User.create(newUser);
    console.log("id", result.dataValues.id);

    const payload = { user: { user_id: result.dataValues.id } };
    let access_token = await generateToken(payload);
    console.log("AT", access_token);

    if (result) {
      let resultData = {
        user: result,
        access_token,
      };
      successResponse(res, "User created successfully", [resultData], 200);
    } else successResponse(res, "User not created", [], 200);
  } catch (error) {
    console.log(error);

    errorResponse(res, "Server error", [], 500);
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let checkUser = await User.findOne({
      where: { email },
      raw: true,
    });
    if (!checkUser) return successResponse(res, "Invalid credentials", [], 200);

    bcrypt.compare(password, checkUser.password, async (err, data) => {
      if (err || !data)
        return successResponse(res, "Invalid credentials", [], 200);

      const payload = { user: { user_id: checkUser.id } };

      let access_token = await generateToken(payload);
      let refresh_token = await generateToken(payload);

      delete checkUser.password;

      let resultData = {
        user: checkUser,
        access_token,
        refresh_token,
      };

      successResponse(res, "Successfully login", [resultData], 200);
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, "Server error", [], 500);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
