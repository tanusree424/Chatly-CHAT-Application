import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://tbasuchoudhury_db_user:Tanusree97@cluster0.ojm6h8r.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0";
// console.log(MONGODB_URL);

export const connectToDB = ()=>{
    try {
        mongoose.connect(MONGODB_URL , console.log("connected to database") )
        }
     catch (error) {
        console.log(error)
    }
}
export default mongoose;
