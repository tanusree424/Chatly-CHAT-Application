import express from "express";
import { sendMessage, getMessages } from "../Controllers/Message.Controller.js";
import upload from "../Middleware/Multer.js";
import isAuth from "../Middleware/isAuth.js";
const messageRouter = express.Router();
messageRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);
messageRouter.get("/:receiver", isAuth, getMessages);
export default messageRouter;