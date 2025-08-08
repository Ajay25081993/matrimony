import express from "express";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { Info, Interest, User } from "../models/Schemas.js";
import handleValidationErrors from "../middleware/validateRequest.js";
import {
  addInterestValidation,
  userIdParamValidation,
  interestIdParamValidation,
  updateInterestValidation,
} from "../validators/interestValidator.js";

const interestRouter = express.Router();

// Create Interest
interestRouter.post(
  "/add",
  addInterestValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { sender_id, receiver_id } = req.body;
      const interest = await Interest.create({ receiver_id, sender_id });
      successResponse(res, "Interest created successfully", interest, 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// List Interests of a User
interestRouter.get(
  "/list/:user_id",
  userIdParamValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { user_id } = req.params;

      const interests = await Interest.findAll({
        where: { sender_id: user_id, is_deleted: 0 },
        attributes: ["id", "sender_id", "receiver_id", "status", "created_at"],
        include: [
          {
            model: User,
            as: "sender",
            attributes: ["id", "firstName", "lastName", "profilePic", "age"],
            include: [
              {
                model: Info,
                as: "Info",
                attributes: ["city", "height", "qualification", "workAs"],
              },
            ],
          },
          {
            model: User,
            as: "receiver",
            attributes: ["id", "firstName", "lastName", "profilePic", "age"],
            include: [
              {
                model: Info,
                as: "Info",
                attributes: ["city", "height", "qualification", "workAs"],
              },
            ],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      successResponse(res, "Interests sent list", interests, 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error while fetching sent interests", [], 500);
    }
  }
);

// interestRouter.get(
//   "/list/:user_id",
//   userIdParamValidation,
//   handleValidationErrors,
//   async (req, res) => {
//     try {
//       const { user_id } = req.params;
//       const interests = await Interest.findAll({
//         where: { sender_id: user_id },
//       });
//       successResponse(res, "Interest list", interests, 200);
//     } catch (error) {
//       console.error(error);
//       errorResponse(res, "Server error", [], 500);
//     }
//   }
// );

// List all Interests
interestRouter.get("/full-list", async (req, res) => {
  try {
    const interests = await Interest.findAll({
      attributes: ["id", "sender_id", "receiver_id", "status", "created_at","updated_at"],
      include: [
        {
          model: User,
          as: "sender",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "profilePic",
            "age",
            "gender",
          ],
          include: [
            {
              model: Info,
              as: "Info",
              attributes: ["city", "height", "qualification", "workAs"],
            },
          ],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["id", "firstName", "lastName", "profilePic", "age","gender"],
          include: [
            {
              model: Info,
              as: "Info",
              attributes: ["city", "height", "qualification", "workAs"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    successResponse(res, "Full Interest List", interests, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
});

// Update Interest by ID
interestRouter.put(
  "/:id",
  interestIdParamValidation,
  updateInterestValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(id);
      console.log(status);

      const interest = await Interest.findByPk(id);
      if (!interest) return successResponse(res, "Interest not found", [], 200);

      interest.status = status;
      await interest.save();

      successResponse(res, "Interest updated successfully", interest, 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// Delete Interest by ID
interestRouter.delete(
  "/:id",
  interestIdParamValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;

      const interest = await Interest.findByPk(id);
      if (!interest) return successResponse(res, "Interest not found", [], 200);

      await interest.destroy();

      successResponse(res, "Interest deleted successfully", [], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

export default interestRouter;
