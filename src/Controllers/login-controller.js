import CryptoJS from "crypto-js";
import User from "../Models/User-model.js";
import { configDotenv } from "dotenv";
import { createToken } from "../utils/token-manager.js";
configDotenv();
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ meaasge: "User not register" });
    }
    if (!user.user.password && user.user.provider === "google") {
      return res.status(404).json({ message: "Please Login With GOOGLE" });
    }
    const bytes = CryptoJS.AES.decrypt(
      user.user.password,
      `${process.env.SECRET_KEY}`
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalPassword);
    if (email !== user.email && password !== originalPassword) {
      return res
        .status(404)
        .json({ message: "Please Enter Valid Credentials" });
    }
    if (email === user.email && password === originalPassword) {
      const token = await createToken({
        email: user.user.email,
        name: user.user.name,
        id: user._id,
        profileImage: user.user.profileImage,
      });

      return res.status(200).json({
        message: "User Loggedin Successfully",
        id: user._id.toString(),
        name: user.user.name,
        email: user.user.email,
        profileImage: user.user.profileImage,
        token,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
export default loginUser;
