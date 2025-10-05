// index.js
import dotenv from "dotenv";
import colors from "@colors/colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./Socket/Socket.js"; // app & server import
import { connectToDB } from "./config/db.js";
import Authrouter from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import messageRouter from "./Routes/MessageRoutes.js";
import isAuth from "./Middleware/isAuth.js";
import express from  "express"

dotenv.config();
const PORT = process.env.PORT ;

// Middlewares
app.use(cors({
  origin: [
    "https://chatly-chat-application-4iw5.onrender.com",
    "http://localhost:5173" // dev time
  ],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/users",  userRoutes);
app.use("/api/v1/messages", messageRouter);

// Start server
server.listen(PORT, async () => {
  await connectToDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
