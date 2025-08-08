import { body } from "express-validator";


const preferencesValidator = [
  body("ageFrom")
    .notEmpty().withMessage("Age from is required")
    .isInt().withMessage("Age from must be a number"),

  body("ageTo")
    .notEmpty().withMessage("Age to is required")
    .isNumeric().withMessage("Age to must be a number"),

  body("heightFrom")
    .optional(),

  body("heightTo")
    .optional(),

  body("religion")
    .notEmpty().withMessage("Religion is required"),

  body("income")
    .optional(),

  body("aboutPartner")
    .isLength({ max: 1000 }).withMessage("About Partner must be under 1000 characters"),

  // Add as needed for multi-select fields — as comma separated string or JSON
  body("caste")
    .optional(),

  body("star")
    .optional(),

  body("rashi")
    .optional(),

  body("education")
    .optional(),

  body("workIn")
    .optional(),

  body("workAs")
    .optional(),

  body("residingStates")
    .optional(),

  body("residingCities")
    .optional(),

  // Add any other validation you need...
];

export default preferencesValidator;
