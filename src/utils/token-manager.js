import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
export const createToken = async (data) => {
  return jwt.sign(
    {
      success: true,
      email: data.email,
      name: data.name,
      id: data.id,
      profileImage: data.profileImage,
    },
    `${process.env.SECRET_KEY}`,
    { expiresIn: "7d" }
  );
};
export const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token NotFound" });
  }
  const Secret = process.env.SECRET_KEY;
  return new Promise((resolve, reject) => {
    return jwt.verify(token, Secret, (err, data) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = data;
        return next();
      }
    });
  });
};
