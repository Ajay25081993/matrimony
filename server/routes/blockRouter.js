import express from "express";
import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { Block, User } from "../models/Schemas.js";
import {
  addBlockValidation,
  getBlocksByUserValidation,
  getBlockedByValidation,
  deleteBlockValidation,
} from "../validators/blockValidator.js";
import validateRequest from "../middleware/validateRequest.js";

const blockRouter = express.Router();

// Add Block
blockRouter.post(
  "/add",
  addBlockValidation,
  validateRequest,
  async (req, res) => {
    try {
      const { blocker_id, blocked_id } = req.body;
      const block = await Block.create({ blocker_id, blocked_id });
      successResponse(res, "User blocked successfully", [block], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// List of users blocked by a user
blockRouter.get(
  "/by-user/:blocker_id",
  getBlocksByUserValidation,
  validateRequest,
  async (req, res) => {
    try {
      const blocks = await Block.findAll({
        where: { blocker_id: req.params.blocker_id },
        include: [
          {
            model: User,
            as: "blockedUser",
            attributes: ["id", "username", "email"],
          },
        ],
      });
      successResponse(res, "Blocked users", blocks, 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// List of users who blocked a user
blockRouter.get(
  "/blocked-by/:blocked_id",
  getBlockedByValidation,
  validateRequest,
  async (req, res) => {
    try {
      const blocks = await Block.findAll({
        where: { blocked_id: req.params.blocked_id },
        include: [
          {
            model: User,
            as: "blockerUser",
            attributes: ["id", "username", "email"],
          },
        ],
      });
      successResponse(res, "Users who blocked this user", blocks, 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// Unblock
blockRouter.delete(
  "/:id",
  deleteBlockValidation,
  validateRequest,
  async (req, res) => {
    try {
      const block = await Block.findOne({ where: { id: req.params.id } });
      if (!block) return successResponse(res, "Block not found", [], 200);

      await block.destroy();
      successResponse(res, "Block removed successfully", [], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

export default blockRouter;
