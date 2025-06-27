import { body, param } from "express-validator";

const addInfoValidation = [
  // body('user_id').isInt().withMessage('user_id must be an integer'),
  // body('profile_pic').optional().isString(),
  // body('popularity').isInt().withMessage('Popularity is required and must be an integer'),
  // body('latitude').optional().isFloat(),
  // body('longitude').optional().isFloat(),
  // body('address_modified').optional().isBoolean(),

  // 👇 New fields you listed
  // param("user_id").isInt().withMessage("user_id must be an integer"),
  body("highestQualification").optional().isString(),
  body("college").optional().isString(),
  body("workWith").optional().isString(),
  body("workAs").optional().isString(),
  body("company").optional().isString(),
  body("monthlyIncome").optional().isString(),
  body("yearlyIncome").optional().isString(),
  body("city").optional().isString(),
  body("liveWithFamily").optional().isString(),
  body("maritalStatus").optional().isString(),
  body("hasChildren").optional().isString(),
  body("diet").optional().isString(),
  body("height").optional().isString(),
  body("weight").optional().isString(),
  body("subCommunity").optional().isString(),
  body("casteNoBar").optional().isBoolean(),
  body("about").optional().isString(),
];

export default addInfoValidation;

// Validation for getting, updating, deleting info by user_id
const userIdParamValidation = [
  param("user_id").isInt().withMessage("user_id must be an integer"),
];

// Validation for updating user info
const updateInfoValidation = [
  body("gender").optional().isIn(["male", "female", "other"]),
  body("age").optional().isInt({ min: 18 }),
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("sexuality").optional().isString(),
  body("bio").optional().isString(),
  body("profile_pic").optional().isString(),
  body("popularity").optional().isInt(),
  body("latitude").optional().isFloat(),
  body("longitude").optional().isFloat(),
  body("address_modified").optional().isBoolean(),
];

export { addInfoValidation, userIdParamValidation, updateInfoValidation };
