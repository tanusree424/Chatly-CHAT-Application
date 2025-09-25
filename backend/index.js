import express from "express";
import dotenv from "dotenv";
import colors from "@colors/colors";
import bodyParser from "body-parser";
import Authrouter from "./Routes/AuthRoutes.js";

import { connectToDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/UserRoutes.js";
import isAuth from "./Middleware/isAuth.js";
dotenv.config();
const PORT =  process.env.PORT ;

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // তোমার React dev server URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // cookies allow করতে হবে
}));

app.use(express.json());
app.use(bodyParser.urlencoded());


app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/users", isAuth , userRoutes); 
app.listen(PORT, ()=>{
connectToDB();
    console.log(`Server Running on PORT http://localhost:${PORT}`)
});