import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
export const verifyToken = async (req, res, next) => {
  const { token } = req.body;
  console.log(token);
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
        console.log("token verification successful");
        resolve();
        res.locals.jwtData = data;
        return next();
      }
    });
  });
};
