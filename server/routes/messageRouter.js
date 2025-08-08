import express from "express";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { Message } from "../models/Schemas.js";
import handleValidationErrors from "../middleware/validateRequest.js";
import { Op } from "sequelize";
import {
  sendMessageValidation,
  conversationQueryValidation,
  messageIdParamValidation,
} from "../validators/messageValidator.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/message.controller.js";
import cloudinary from "../lib/cloudinary.js";

const messageRouter = express.Router();

// Send a Message
messageRouter.post(
  "/send/:receiver_id",
  sendMessageValidation,
  handleValidationErrors,
  sendMessage
);

// Get Messages between two users (with pagination)
messageRouter.get(
  "/conversation/:selectedUserId",
  conversationQueryValidation,
  handleValidationErrors,
  getMessages
);
messageRouter.get("/users", getUsersForSidebar);

messageRouter.put("/mark/:id", markMessageAsSeen);

// Delete a message by ID
messageRouter.delete(
  "/:id",
  messageIdParamValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const message = await Message.findByPk(id);

      if (!message) return successResponse(res, "Message not found", [], 200);

      await message.destroy();
      successResponse(res, "Message deleted successfully", [], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

export default messageRouter;
