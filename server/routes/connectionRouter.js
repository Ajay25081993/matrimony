import express from "express";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { Connection, User } from "../models/Schemas.js";
import handleValidationErrors from "../middleware/validateRequest.js";
import {
  updateConnectionValidation,
  getConnectionValidation,
} from "../validators/connectionValidator.js";

const connectionRouter = express.Router();

// Create or Update User Connection Time
connectionRouter.post(
  "/update",
  updateConnectionValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { user_id, last_connection } = req.body;

      const [connection, created] = await Connection.upsert({
        user_id,
        last_connection: last_connection || new Date(),
      });

      successResponse(
        res,
        created ? "Connection recorded" : "Connection updated",
        [connection],
        200
      );
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

connectionRouter.post("/add/:id", async (req, res) => {
  const userId = req.params.id;
  // const { connectedUserId } = req.body;

  try {
    const newConnection = await Connection.create({
      user_id: userId,
      // connected_user_id: connectedUserId,
    });

    successResponse(res,"Connection created succesfully", newConnection, 200);
  } catch (error) {
    console.error("Failed to create connection:", error);
    errorResponse(res,"Error creating connection", error, 500);
  }
});

// Get User's Last Connection
connectionRouter.get(
  "/:user_id",
  getConnectionValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { user_id } = req.params;

      const connection = await Connection.findOne({
        where: { user_id },
        include: [
          { model: User, as: "user", attributes: ["id", "username", "email"] },
        ],
      });

      if (!connection)
        return successResponse(res, "No connection record found", [], 200);

      successResponse(res, "Connection details", [connection], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

export default connectionRouter;
