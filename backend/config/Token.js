import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const genToken =  async(userId)=>{
   const SECRET = process.env.SECRECT_KEY || "fallbackSecret";
    // const token  = await  jwt.sign(SECRET_KEY, userId , {expiresIn:"7d"})
    const token =  jwt.sign({id:userId}, SECRET ,  {expiresIn:"7d"} );
    return token;
}