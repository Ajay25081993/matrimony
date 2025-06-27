import express from "express";
import { successResponse, errorResponse } from "../helper/responseHelper.js";
import { Photo, User } from "../models/Schemas.js";
import handleValidationErrors from "../middleware/validateRequest.js";
// import {
//   addOrUpdatePhotosValidation,
//   userIdParamValidation,
// } from "../validators/photoValidator.js";
import cloudinary from "../lib/cloudinary.js";
import { upload } from "../lib/multer.js";

const photoRouter = express.Router();

// Add or Update Photos for a User
photoRouter.post(
  "/add",
  upload.single("selectedImg"),
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.user;
      const fileBuffer = req.file.buffer;

      if (!fileBuffer) {
        return errorResponse(res, "No file provided", [], 400);
      }

      // Upload to Cloudinary using buffer stream
      const uploadResponse = await cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        async (error, result) => {
          if (error) {
            console.error(error);
            return errorResponse(res, "Upload failed", [], 500);
          }

          let photos = await Photo.findOne({ where: { user_id: userId } });

          if (photos) {
            let added = false;

            for (let i = 1; i <= 5; i++) {
              if (!photos[`pic${i}`]) {
                photos[`pic${i}`] = result.secure_url;
                added = true;
                break;
              }
            }

            if (!added) {
              return errorResponse(
                res,
                "All photo slots are already filled",
                [],
                400
              );
            }

            await photos.save();
            successResponse(res, "Photo uploaded successfully", [photos], 200);
          } else {
            photos = await Photo.create({
              user_id: userId,
              pic1: result.secure_url,
              pic2: null,
              pic3: null,
              pic4: null,
              pic5: null,
            });

            successResponse(res, "Photos added successfully", [photos], 200);
          }
        }
      );

      // Pipe buffer to cloudinary stream
      const streamifier = (await import("streamifier")).default;
      streamifier.createReadStream(fileBuffer).pipe(uploadResponse);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

// Get Photos by User ID
photoRouter.get(
  "/:user_id",
 
  handleValidationErrors,
  async (req, res) => {
    try {
      const photos = await Photo.findOne({
        where: { user_id: req.params.user_id },
      });

      if (!photos) return successResponse(res, "Photos not found", [], 200);

      successResponse(res, "Photos details", [photos], 200);
    } catch (error) {
      console.error(error);
      errorResponse(res, "Server error", [], 500);
    }
  }
);

photoRouter.put(
  "/upload-photo",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const userId = req.user; // sent along in formData

      if (!req.file) {
        return res.status(400).json({ message: "Profile pic is required" });
      }

      // Upload buffer to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Cloudinary error" });
          }

          // Update user in DB
          await User.update(
            { profilePic: result.secure_url },
            { where: { id: userId } }
          );

          const updatedUser = await User.findByPk(userId);

          successResponse(res, "Photos added successfully", [updatedUser], 200);
        }
      );

      // Pipe multer buffer to Cloudinary
      uploadResponse.end(req.file.buffer);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

photoRouter.put("/delete", async (req, res) => {
  const { publicId, name } = req.body;
  const userId = req.user;

  try {
    // Delete from cloudinary first
    await cloudinary.uploader.destroy(publicId);
    if (name === "profilePic") {
      await User.update({ imageUrl: null }, { where: { id: userId } });
    } else {
      console.log("Delete");

      await Photo.update({ [name]: null }, { where: { user_id: userId } });
    }

    return successResponse(res, "Photo deleted successfully", [], 200);
  } catch (err) {
    console.error("Err", err);
    return errorResponse(res, "Failed to delete photo", 500);
  }
});

export default photoRouter;
