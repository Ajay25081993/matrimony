import express from "express";
import handleValidationErrors from "../middleware/validateRequest.js";
import {
  addInfoValidation,
  userIdParamValidation,
  updateInfoValidation,
} from "../validators/infoValidator.js";
import {
  createInfo,
  deleteInfo,
  getInfo,
  updateInfo,
} from "../controllers/Info.controller.js";

const infoRouter = express.Router();

// Create Info
infoRouter.post("/add", addInfoValidation, handleValidationErrors, createInfo);

// Get Info by User ID
infoRouter.get(
  "/:user_id",
  userIdParamValidation,
  handleValidationErrors,
  getInfo
);

// Update Info
infoRouter.put(
  "/:user_id",
  userIdParamValidation,
  // updateInfoValidation,
  handleValidationErrors,
  updateInfo
);

// Delete Info
infoRouter.delete(
  "/:user_id",
  userIdParamValidation,
  handleValidationErrors,
  deleteInfo
);

export default infoRouter;
