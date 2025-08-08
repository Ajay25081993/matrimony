import { body, param } from "express-validator";

// Create User Validation
const createUserValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Get User by ID Validation

const getUserByIdValidator = [
  param("user_id").isInt().withMessage("user_id must be an integer"),
];

// Update User Validation
const updateUserValidator = [
  param("user_id").isInt().withMessage("user_id must be an integer"),
  body("username")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Username must be at least 2 characters"),
  body("email").optional().isEmail().withMessage("Provide a valid email"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const passwordCheckValidator = [
  param("user_id").isInt().withMessage("user_id must be an integer"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Delete User Validation
const deleteUserValidator = [
  param("user_id").isInt().withMessage("user_id must be an integer"),
];
export {
  createUserValidator,
  getUserByIdValidator,
  updateUserValidator,
  passwordCheckValidator,
  deleteUserValidator,
};
