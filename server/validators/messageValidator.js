import { body, param, query } from "express-validator";

// Validation for sending a message
const sendMessageValidation = [
  param("receiver_id").isInt().withMessage("receiver_id must be an integer"),
  body("message").notEmpty().withMessage("Message is required"),
  // .isLength({ max: 256 }).withMessage('Message max length is 256 characters'),
  body("time")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Invalid time format (HH:mm)"),
];

// Validation for fetching conversation messages
const conversationQueryValidation = [
  param("selectedUserId").isInt().withMessage("selectedUserId must be an integer"),
  // query("user2_id").isInt().withMessage("user2_id must be an integer"),
  // query("page_no").optional().isInt({ min: 1 }),
  // query("per_page").optional().isInt({ min: 1 }),
];

// Validation for deleting a message by ID
const messageIdParamValidation = [
  param("id").isInt().withMessage("id must be an integer"),
];

export {
  sendMessageValidation,
  conversationQueryValidation,
  messageIdParamValidation,
};
