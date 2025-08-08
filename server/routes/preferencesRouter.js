import express from "express";
import handleValidationErrors from "../middleware/validateRequest.js";
import {
  createPartnerPreferences,
  deletePartnerPreferences,
  getPartnerPreferences,
  updatePartnerPreferences,
} from "../controllers/preferences.controller.js";
// import preferencesValidator from "../validators/preferencesValidator.js";

const preferencesRouter = express.Router();

// Create Info
preferencesRouter.post(
  "/add",
//   preferencesValidator,
//   handleValidationErrors,
  createPartnerPreferences
);

// Get Info by User ID
preferencesRouter.get("/:user_id", getPartnerPreferences);

// Update Info
preferencesRouter.put(
  "/:user_id",
//   preferencesValidator,
//   handleValidationErrors,
  updatePartnerPreferences
);

// Delete Info
preferencesRouter.delete("/:user_id", deletePartnerPreferences);

export default preferencesRouter;
