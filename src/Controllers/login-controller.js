import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../Models/User-model.js";
import { configDotenv } from "dotenv";
configDotenv();
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not register");
    }
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      `${process.env.SECRET_KEY}`
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (email !== user.email && password !== originalPassword) {
      return res.status(401).send("Invalid Credentials");
    }
    if (email === user.email && password === originalPassword) {
      const token = jwt.sign(
        { success: true, email: user.email, name: user.name },
        `${process.env.SECRET_KEY}`,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "User Loggedin Successfully",
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        token,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
export default loginUser;
