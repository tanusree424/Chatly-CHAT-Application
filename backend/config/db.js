import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL  ||  "mongodb+srv://tbasuchoudhury_db_user:Tanusree97@cluster0.ojm6h8r.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDB = ()=>{
    try {
        mongoose.connect(MONGODB_URL , console.log("connected to database") )
        }
     catch (error) {
        console.log(error)
    }
}
export default mongoose;
