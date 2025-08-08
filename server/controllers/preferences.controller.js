import e from "express";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { PartnerPreferences } from "../models/Schemas.js";

// CREATE
export const createPartnerPreferences = async (req, res) => {
  try {
    const {
      age,
      height,
      maritalStatus,
      motherTongue,
      physicalStatus,
      eatingHabits,
      drinkingHabits,
      smokingHabits,
      religion,
      caste,
      dosh,
      star,
      rashi,
      education,
      workIn,
      workAs,
      income,
      residingStates,
      residingCities,
      aboutPartner,
    } = req.body;

    const newPreference = {
      user_id: req.user,
      age_from: age.from,
      age_to: age.to,
      height_from: height.from,
      height_to: height.to,
      marital_status: maritalStatus,
      mother_tongue: motherTongue,
      physical_status: physicalStatus,
      eating_habits: eatingHabits,
      drinking_habits: drinkingHabits,
      smoking_habits: smokingHabits,
      religion: religion,
      caste: caste,
      dosh: dosh,
      star: star,
      rashi:rashi,
      education:education,
      work_in:workIn,
      work_as:workAs,
      income:income,
      residing_cities:residingCities,
      residing_states:residingStates,
      about_partner:aboutPartner,
    };

    const preference = await PartnerPreferences.create(newPreference);
    successResponse(
      res,
      "Partner preferences created successfully",
      [preference],
      200
    );
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
};

// GET
export const getPartnerPreferences = async (req, res) => {

  
  try {
    const preference = await PartnerPreferences.findOne({
      where: { user_id: req.params.user_id },
    });

    if (!preference)
      return successResponse(res, "Preferences not found", [], 200);


    successResponse(res, "User partner preferences", [preference], 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
};

// UPDATE
export const updatePartnerPreferences = async (req, res) => {
  try {
    const preference = await PartnerPreferences.findOne({
      where: { user_id: req.params.user_id },
    });

    if (!preference)
      return successResponse(res, "Preferences not found", [], 200);

    await preference.update({ ...req.body });
    successResponse(
      res,
      "Partner preferences updated successfully",
      [preference],
      200
    );
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
};

// DELETE
export const deletePartnerPreferences = async (req, res) => {
  try {
    const preference = await PartnerPreferences.findOne({
      where: { user_id: req.params.user_id },
    });

    if (!preference)
      return successResponse(res, "Preferences not found", [], 200);

    await preference.destroy();
    successResponse(res, "Partner preferences deleted", [], 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
};
