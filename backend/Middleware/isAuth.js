import jwt from "jsonwebtoken";
import dotenv from  "dotenv";
dotenv.config();
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const SECRET = process.env.SECRECT_KEY || "fallbackSecret";
    const decoded = jwt.verify(token, SECRET);

    req.userId = decoded.id; // genToken এ আমরা { id: userId } পাঠাচ্ছি
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export default isAuth;
