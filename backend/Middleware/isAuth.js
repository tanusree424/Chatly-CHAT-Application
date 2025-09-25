import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const SECRET = process.env.JWT_SECRET || "fallbackSecret";
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
