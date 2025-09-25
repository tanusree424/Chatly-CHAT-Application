import mongoose from "../config/db.js";
import { Schema } from "mongoose";
const userSchema =  new Schema({
   name: {
      type: String,
      required: true
   },
   username: {
    type: String,
    required: true,
    unique: true
   },
   email:{
    type: String,
    required: true,
    unique: true
   },
   password:{
    type:String,
    required: true
   },
   picture:{
    type:String,
    default:""
   }
}, {timestamps: true})

const userModel =  mongoose.model("Users", userSchema);
export default userModel