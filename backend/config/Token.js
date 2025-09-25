import jwt from "jsonwebtoken";

export const genToken =  async(userId)=>{
   const SECRET = process.env.JWT_SECRET || "fallbackSecret";
    // const token  = await  jwt.sign(SECRET_KEY, userId , {expiresIn:"7d"})
    const token =  jwt.sign({id:userId}, SECRET ,  {expiresIn:"7d"} );
    return token;
}