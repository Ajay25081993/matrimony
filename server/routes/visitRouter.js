import express from "express";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { Visit, User, Info } from "../models/Schemas.js";
import validate from "../middleware/validateRequest.js";
import {
  createVisitValidator,
  getVisitedValidator,
  getVisiterValidator,
} from "../validators/visitValidator.js";

const visitRouter = express.Router();

// Record a Visit
visitRouter.post("/add", createVisitValidator, validate, async (req, res) => {
  try {
    const { visiter_id, visited_id } = req.body;

    const visit = await Visit.create({
      visiter_id,
      visited_id,
      time: new Date(),
    });

    successResponse(res, "Visit recorded", [visit], 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
});

// Get profiles who visited this user
visitRouter.get(
  "/visited/:user_id",
  getVisitedValidator,
  validate,
  async (req, res) => {
    try {
      const visits = await Visit.findAll({
        where: { visited_id: req.params.user_id },
        include: [
          {
            model: User,
            as: "visiter",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "profilePic",
              "email",
              "age",
            ],
          },
           {
            model: Info,
            as: "visiterUserInfo",
            attributes: [
              "height",
              "subCommunity",
              "qualification",
              "workAs",
              "city",
            ],
          },
        ],
      });

      successResponse(res, "Visits received", visits, 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// Get profiles this user has visited
visitRouter.get(
  "/visiter/:user_id",
  getVisiterValidator,
  validate,
  async (req, res) => {
    try {
      const visits = await Visit.findAll({
        where: { visiter_id: req.params.user_id },
        include: [
          {
            model: User,
            as: "visited",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "profilePic",
              "email",
              "age",
            ],
          },
          {
            model: Info,
            as: "visitedUserInfo",
            attributes: [
              "height",
              "subCommunity",
              "qualification",
              "workAs",
              "city",
            ],
          },
        ],
      });

      successResponse(res, "Visits made", visits, 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

export default visitRouter;
