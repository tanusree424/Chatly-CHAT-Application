import express from "express";
import { getLoginUser , editProfile , getAllUsersExceptLoginUser } from "../Controllers/UserController.js";
import isAuth from "../Middleware/isAuth.js";
import upload from "../Middleware/Multer.js";
const userRoutes = express.Router();

userRoutes.get("/current-user",isAuth, getLoginUser);
userRoutes.put("/edit-profile", isAuth, upload.single("picture"), editProfile);
userRoutes.get("/all-users", isAuth, getAllUsersExceptLoginUser);
export default userRoutes;