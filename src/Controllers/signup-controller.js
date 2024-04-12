import CryptoJS from "crypto-js";
import User from "../Models/User-model.js";
import { configDotenv } from "dotenv";
import { createToken } from "../utils/token-manager.js";
configDotenv();
const signupUser = async (req, res) => {
  try {
    const { name, email, password, image, provider } = req.body;
    console.log("data", name, email, password, image, provider);
    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) {
      return res.status(400).json({
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
      profileImage: image,
      provider,
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
    const token = await createToken({
      email: newUser.email,
      name: newUser.name,
      id: newUser._id,
    });
    console.log(token);

    return res.status(200).json({
      token: token,
      message: "User Created Successfully",
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      profileImage: newUser.profileImage,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
export default signupUser;
