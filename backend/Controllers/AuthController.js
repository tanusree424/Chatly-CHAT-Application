
import userModel from "../Models/Users.js";
import bcrypt from "bcryptjs";
import { genToken } from "../config/Token.js";
export const signup = async(req,res)=>{
    try {
  const {username, email,password} = req.body;
  const checkUsernameExist = await userModel.findOne({username});
  const checkEmailExist = await userModel.findOne({email});
  if (checkUsernameExist) {
    res.status(400).json({
        message:"User name already exist"
    })
  }
  if (checkEmailExist) {
    res.status(400).json({
        message:"Email is already exist"
    })
  }
  const hashedPassword =await bcrypt.hash(password,10);
  if (password.length <6 ) {
    res.status(400).json({
        message:"password must be 6  character"
    });
  } 
  const user = await  userModel.create({username , email  , password : hashedPassword });
  const token =  genToken( user._id);
  res.cookie("token", token,{ httpOnly: true, maxAge: 7*24*60*60*1000, sameSite:"None", secure:true });
  return res.status(201).json({
    message:"USER CREATED SUCCCESSSFULLY",
    token:token,
    user:user
  })
}catch(error)
{
  res.status(500).json({
    message:"Internal server error"
  })
}
}

export const login = async(req,res)=>{
    try{
    const {email, password} = req.body;
    const userExist =await userModel.findOne({email});
    if (!userExist) {
        return res.status(404).json({
            message:"User Not Found"
        })
    }
    const isMatched = await bcrypt.compare(password,userExist.password);
    if (!isMatched) {
        return res.status(400).json({
            message:"Password not matched"
        })
    }
    const {password:_, ...userData} = userExist.toObject();
    const token = await genToken(userExist._id);
    res.cookie("token", token , {httpOnly:true, maxAge:7*24*60*60*1000, sameSite:"None", secure:true});
    return res.status(200).json({
        message:"LoggedIn Successful",
        token:token,
        user: userData
    });
}catch(error)
{
  res.status(500).json({
    message:"Internal server error"
  })
}
}

let blacklist = []; // simple in-memory (production এ Redis ব্যবহার করবি)

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      blacklist.push(token);
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



    
