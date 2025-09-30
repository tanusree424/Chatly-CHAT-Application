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
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: "http://localhost:5173", // trailing slash বাদ
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // cookies পাঠাতে হলে অবশ্যই true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/users", isAuth, userRoutes);
app.use("/api/v1/messages", isAuth, messageRouter);

// Start server
server.listen(PORT, async () => {
  await connectToDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
