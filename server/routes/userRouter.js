import express from "express";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { User, Info, PartnerPreferences } from "../models/Schemas.js";
import validate from "../middleware/validateRequest.js";
import {
  createUserValidator,
  getUserByIdValidator,
  updateUserValidator,
  passwordCheckValidator,
  deleteUserValidator,
} from "../validators/userValidator.js";
import { updateProfile } from "../controllers/auth.controller.js";
import bcrypt from "bcryptjs";

const userRouter = express.Router();
const educationCategoryMap = {
  "B.A": "Bachelor's - Arts / Science / Commerce",
  "B.Com": "Bachelor's - Arts / Science / Commerce",
  "B.Sc": "Bachelor's - Arts / Science / Commerce",
  "M.A": "Master's - Arts / Science / Commerce",
  "M.Com": "Master's - Arts / Science / Commerce",
  "M.Sc": "Master's - Arts / Science / Commerce",
  MCA: "Master's - Arts / Science / Commerce",
  "B.Tech": "Bachelor's - Engineering / Computer Science",
  "B.E": "Bachelor's - Engineering / Computer Science",
  "M.Tech": "Master's - Engineering / Computer Science",
  "M.E": "Master's - Engineering / Computer Science",
};
// Create User
userRouter.post("/add", createUserValidator, validate, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    successResponse(res, "User Created Successfully", [user], 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
});

// Get User List
// userRouter.get("/list", async (req, res) => {
//   try {
//     const { user_id, gender } = req.query;
//     console.log(user_id, gender);

//     let oppositeGender;
//     if (gender === "Male") {
//       oppositeGender = "Female";
//     } else if (gender === "Female") {
//       oppositeGender = "Male";
//     } else {
//       oppositeGender = null;
//     }

//     const whereCondition = oppositeGender
//       ? { gender: oppositeGender }
//       : undefined;

//     const users = await User.findAll({
//       where: whereCondition,
//       include: [{ model: Info, as: "Info" }],
//     });

//     const preferences = await PartnerPreferences.findAll({
//       where: { user_id: user_id },
//     });
//     console.log(preferences[0].dataValues);

//     successResponse(res, "User List", [users], 200);
//   } catch (error) {
//     console.error(error);
//     errorResponse(res, "Server error", [], 500);
//   }
// });

userRouter.get("/list", async (req, res) => {
  try {
    const { user_id, gender } = req.query;

    if (!user_id || !gender) {
      return errorResponse(res, "Missing user_id or gender", [], 400);
    }

    let oppositeGender =
      gender === "Male" ? "Female" : gender === "Female" ? "Male" : null;

    if (!oppositeGender) {
      return errorResponse(res, "Invalid gender", [], 400);
    }

    const preferences = await PartnerPreferences.findOne({
      where: { user_id },
    });

    if (!preferences) {
      return errorResponse(res, "No preferences found for user", [], 404);
    }

    const pref = preferences.dataValues;

    const users = await User.findAll({
      where: { gender: oppositeGender },
      include: [{ model: Info, as: "Info" }],
    });

    const totalFields = 18;
    const minMatchPercentage = 70;
    let percentage = 0;
    let matchCount = 0;
    const matchedUsers = users.filter((user) => {
      const info = user.Info;
      if (!info) return false;
      matchCount = 0;
      // 1. Age
      if (
        parseInt(user.dataValues.age) >= parseInt(pref.age_from) &&
        parseInt(user.dataValues.age) <= parseInt(pref.age_to)
      ) {
        console.log("Age");
        matchCount++;
      }

      // 2. Height
      if (
        parseFloat(info.height) >= parseFloat(pref.height_from) &&
        parseFloat(info.height) <= parseFloat(pref.height_to)
      ) {
        console.log("Height");
        matchCount++;
      }

      // 3. Marital Status
      if (
        pref.marital_status &&
        pref.marital_status.split("|").includes(info.maritalStatus)
      ) {
        console.log("MS");
        matchCount++;
      }

      // 4. Mother Tongue
      if (
        pref.mother_tongue &&
        pref.mother_tongue
          .split("|")
          .some((lang) => info.languageKnown?.split(" ").includes(lang))
      ) {
        console.log("MT");
        matchCount++;
      }

      // 5. Physical Status
      if (pref.physical_status === info.physicalStatus) {
        console.log("PS");
        matchCount++;
      }

      // 6. Eating Habits
      if (pref.eating_habits?.split("|").includes(info.diet)) {
        console.log("EH");
        matchCount++;
      }

      // 7. Smoking Habits
      if (pref.smoking_habits?.split("|").includes(info.smokingHabit)) {
        console.log("SH");
        matchCount++;
      }

      // 8. Drinking Habits
      if (pref.drinking_habits?.split("|").includes(info.drinkingHabit)) {
        console.log("DH");
        matchCount++;
      }

      // 9. Employment Type
      if (pref.work_in?.split("|").includes(info.workWith)) {
        console.log("ET");
        matchCount++;
      }

      // 10. Occupation
      if (pref.work_as?.split("|").includes(info.workAs)) {
        console.log("Occu");
        matchCount++;
      }

      // 11. Income
      if (pref.income === info.income) {
        console.log("Income");
        matchCount++;
      }

      // 12. Education
      const userCategory = educationCategoryMap[info.qualification];
      const prefArray =
        pref.education?.split("|").map((item) => item.trim()) || [];
      if (prefArray.includes(userCategory)) {
        console.log("Edu");
        matchCount++;
      }

      // 13. State
      if (pref.residing_states?.split("|").includes(user.dataValues.state)) {
        console.log("State");
        matchCount++;
      }

      // 14. City
      if (pref.residing_cities?.split("|").includes(info.city)) {
        console.log("City");
        matchCount++;
      }

      // // 15. Gotra (if applicable)
      // if (pref.gotra?.split("|").includes(info.gotra)){
      //   console.log(Height);
      //   matchCount++;
      // }

      // 16. Religion
      if (pref.religion?.split("|").includes(user.dataValues.religion)) {
        console.log("Religion");
        matchCount++;
      }

      // 17. Caste
      if (pref.caste?.split("|").includes(info.subCommunity)) {
        console.log("Caste");
        matchCount++;
      }

      // // 18. Manglik Status
      // if (pref.manglik_status === info.manglikStatus) matchCount++;

      // // 19. Horoscope Match Required
      // if (pref.horoscope_match_required === info.horoscopeMatch) matchCount++;
      // 18. Star
      if (pref.star?.split("|").includes(info.star)) {
        console.log("Star");
        matchCount++;
      }
      // 19. Rashi
      if (pref.rashi.split("|").includes(info.rashi)) {
        console.log("Rashi");
        matchCount++;
      }

      // Calculate match percentage
      percentage = (matchCount / totalFields) * 100;
      return percentage >= minMatchPercentage;
    });

    if (matchedUsers.length) {
      return successResponse(res, "Matched User List", [matchedUsers], 200);
    } else {
      return successResponse(res, "Nothing Matched", [], 200);
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error", [], 500);
  }
});

// Get User by ID
userRouter.get(
  "/:user_id",
  getUserByIdValidator,
  validate,
  async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.params.user_id },
        include: [{ model: Info, as: "Info" }],
      });

      if (!user) return successResponse(res, "User not found", [], 200);
      successResponse(res, "User Details", [user], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// Update User
userRouter.put("/:user_id", updateUserValidator, validate, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.user_id } });

    if (!user) return successResponse(res, "User not found", [], 200);

    Object.assign(user, req.body);
    await user.save();

    const updatedUser = user.toJSON();
    delete updatedUser.password;

    successResponse(res, "User Updated", [updatedUser], 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
});

//check password
userRouter.post(
  "/check-password/:user_id",
  passwordCheckValidator,
  validate,
  async (req, res) => {
    const { user_id } = req.params;
    const { password } = req.body;
    try {
      const user = await User.findOne({ where: { id: user_id } });

      if (!user) return successResponse(res, "User not found", [], 200);

      bcrypt.compare(password, user.password, async (err, data) => {
        if (err || !data)
          return successResponse(res, "Invalid credentials", [], 200);

        successResponse(res, "Password matched", [], 200);
      });
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// Delete User
userRouter.delete(
  "/:user_id",
  deleteUserValidator,
  validate,
  async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.user_id } });
      if (!user) return successResponse(res, "User not found", [], 200);

      await user.destroy();
      successResponse(res, "User Deleted", [], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

userRouter.put("/update-profile", updateProfile);

export default userRouter;
