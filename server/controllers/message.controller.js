import { Op } from "sequelize";
import { Connection, Message, User } from "../models/Schemas.js";
import { errorResponse, successResponse } from "../helper/responseHelper.js";
import { io, userSocketMap } from "../index.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const user_id = req.user;
    const filteredConnections = await Connection.findAll({
      where: {
        user_id: {
          [Op.ne]: user_id,
        },
      },
      include: [
        {
          model: User,
          as: "connectedUser", // use alias if you defined one in association
          attributes: ["id", "firstName","lastName", "profilePic", "email"], // pick desired fields
        },
      ],
    });

    //count number of messages not seen
    const unseenMessages = {};
    const promises = filteredConnections.map(async (user) => {
      const count = await Message.count({
        where: {
          sender_id: user.id,
          receiver_id: user_id,
          seen: false,
        },
      });

      if (count > 0) {
        unseenMessages[user.id] = count;
      }
    });

    await Promise.all(promises);

    successResponse(
      res,
      "Users",
      { users: filteredConnections, unseenMessages },
      200
    );
  } catch (error) {
    console.log(error.message);
    errorResponse(res, "Server error", [], 500);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { selectedUserId } = req.params;
    const loggedInUserId = req.user;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            sender_id: loggedInUserId,
            receiver_id: selectedUserId,
          },
          {
            sender_id: selectedUserId,
            receiver_id: loggedInUserId,
          },
        ],
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "profilePic"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["id",  "profilePic"],
        },
      ],
    });

    await Message.update(
      { seen: true },
      {
        where: {
          [Op.or]: [
            {
              sender_id: selectedUserId,
              receiver_id: loggedInUserId,
              seen: false,
            },
          ],
        },
      }
    );
    successResponse(res, "Messages", messages, 200);
  } catch (error) {
    console.log(error.message);
    errorResponse(res, "Server error", [], 500);
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.update({ seen: true }, { where: { id: id } });
    successResponse(res, "Message marked as seen", [], 200);
  } catch (error) {
    console.log(error.message);
    errorResponse(res, "Server error", [], 500);
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message, time, image } = req.body;
    const { receiver_id } = req.params;

    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const msg = await Message.create({
      sender_id: req.user,
      receiver_id,
      message,
      image: imageUrl || "",
      time: time,
    });

    // Emit the new message to the receiver's socket
    const receiverSocketId = userSocketMap[receiver_id];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", msg.get({ plain: true }));
    }

    // ✅ Return a plain JSON object
    successResponse(
      res,
      "Message sent successfully",
      msg.get({ plain: true }),
      200
    );
  } catch (error) {
    console.error(error);
    errorResponse(res, "Server error", [], 500);
  }
};
