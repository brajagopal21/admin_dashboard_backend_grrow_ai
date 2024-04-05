import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../Models/User-model.js";
import { configDotenv } from "dotenv";
configDotenv();
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) {
      return res.status(401).json({
        message: "User Already Exist",
        email: ExistingUser.email,
      });
    }
    const ciphertext = CryptoJS.AES.encrypt(
      password,
      `${process.env.SECRET_KEY}`
    ).toString();
    const newUser = new User({
      name,
      email,
      password: ciphertext,
      isAdmin: false,
      subscription: [
        {
          subscriptionName: "Growth",
          subscriptionType: "Annually",
          purchasedAt: Date.now(),
        },
      ],
    });
    await newUser.save();

    const token = jwt.sign(
      { success: true, email: email, name: name },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token: token,
      message: "User Created Successfully",
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
  }
};
export default signupUser;
