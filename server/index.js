import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import config from "./config/config.js";
import authMiddleware from "./middleware/authMiddleware.js";
import cors from "cors";
import infosRouter from "./routes/infoRouter.js";
import verifiedRouter from "./routes/verifiedRouter.js";
import likesRouter from "./routes/likeRouter.js";
import dislikesRouter from "./routes/dislikeRouter.js";
import blocksRouter from "./routes/blockRouter.js";
import reportsRouter from "./routes/reportRouter.js";
import connectionRouter from "./routes/connectionRouter.js";
import visitsRouter from "./routes/visitRouter.js";
import photoRouter from "./routes/photoRouter.js";
import messagesRouter from "./routes/messageRouter.js";
import settingsRouter from "./routes/settingsRouter.js";
import notifsRouter from "./routes/notifRouter.js";
import interestsRouter from "./routes/interestRouter.js";
import checkAuthRouter from "./routes/checkAuthRouter.js";
import preferencesRouter from "./routes/preferencesRouter.js";
import { Server, Socket } from "socket.io";
import http from "http";
dotenv.config();
const app = express();
const server = http.createServer(app);
//body data parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Initialze socket.io server
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//Store online users
export const userSocketMap = {}; //{user_id: socket_id}

//Socket.io connection handler
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("a user connected", userId);
    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    //Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
      console.log("User disconnected", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
const port = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies/sessions
  })
);

if (config.seedDB) {
  import("./models/Seed.js")
    .then(() => {
      console.log("Seeding done.");
    })
    .catch((err) => {
      console.error("Seeding failed:", err);
    });
}

//routers
app.use("/auth", authRouter);
app.use("/checkAuth", authMiddleware, checkAuthRouter);
app.use("/user", authMiddleware, userRouter);
app.use("/infos", authMiddleware, infosRouter);
app.use("/preferences", authMiddleware, preferencesRouter);
app.use("/verified", authMiddleware, verifiedRouter);
app.use("/likes", authMiddleware, likesRouter);
app.use("/dislikes", authMiddleware, dislikesRouter);
app.use("/blocks", authMiddleware, blocksRouter);
app.use("/reports", authMiddleware, reportsRouter);
app.use("/connections", authMiddleware, connectionRouter);
app.use("/visits", authMiddleware, visitsRouter);
app.use("/photos", authMiddleware, photoRouter);
app.use("/messages", authMiddleware, messagesRouter);
app.use("/settings", authMiddleware, settingsRouter);
app.use("/notifs", authMiddleware, notifsRouter);
app.use("/interests", authMiddleware, interestsRouter);

//to create server and start on port
server.listen(port, () => {
  console.log(` server running at http://localhost:${port}`);
});
