import CryptoJS from "crypto-js";
import { configDotenv } from "dotenv";
import { createToken } from "../utils/token-manager.js";
import User from "../Models/User-model.js";
import sendWelcomeEmail from "../services/emailServices.js"; // Import sendWelcomeEmail function

configDotenv();

const signupUser = async (req, res) => {
  try {
    const { name, email, password, image, provider } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.user.provider === provider) {
        const token = await createToken({
          email: existingUser.email,
          name: existingUser.user.name,
          id: existingUser._id,
          profileImage: existingUser.user.profileImage,
        });

        return res.status(200).json({
          token: token,
          message: "User Created Successfully",
          id: existingUser._id.toString(),
          name: existingUser.user.name,
          email: existingUser.user.email,
          profileImage: existingUser.user.profileImage,
        });
      } else {
        return res.status(400).json({
          message: "User Already Exists",
          email: existingUser.user.email,
        });
      }
    } else {
      const ciphertext = CryptoJS.AES.encrypt(
        password,
        `${process.env.SECRET_KEY}`
      ).toString();

      const newUser = new User({
        email: email,
        user: {
          name: name,
          email: email,
          password: ciphertext,
          profileImage: image,
          provider: provider,
        },
        isAdmin: false,
        subscription: [
          {
            subscriptionName: "Growth",
            subscriptionType: "Annually",
            purchasedAt: Date.now(),
          },
        ],
      });

      const savedUser = await newUser.save();

      if (!savedUser) {
        return res.status(500).json({ message: "Error creating user" });
      }

      const token = await createToken({
        email: savedUser.user.email,
        name: savedUser.user.name,
        id: savedUser._id,
        profileImage: savedUser.user.profileImage,
      });

      // Send welcome email
      await sendWelcomeEmail(email, name);

      return res.status(200).json({
        token: token,
        message: "User Created Successfully",
        id: savedUser._id.toString(),
        name: savedUser.user.name,
        email: savedUser.user.email,
        profileImage: savedUser.user.profileImage,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default signupUser;
