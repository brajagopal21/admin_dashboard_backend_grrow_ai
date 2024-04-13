import CryptoJS from "crypto-js";
import { configDotenv } from "dotenv";
import { createToken } from "../utils/token-manager.js";
import User from "../Models/User-model.js";
configDotenv();
const signupUser = async (req, res) => {
  try {
    const { name, email, password, image, provider } = req.body;
    console.log("data", name, email, password, image, provider);
    const ExistingUser = await User.findOne({ email });
    console.log(ExistingUser);
    if (ExistingUser) {
      if (ExistingUser.user.provider === provider) {
        const token = await createToken({
          email: ExistingUser.email,
          name: ExistingUser.user.name,
          id: ExistingUser._id,
          profileImage: ExistingUser.user.profileImage,
        });

        console.log(token);
        return res.status(200).json({
          token: token,
          message: "User Created Successfully",
          id: ExistingUser._id.toString(),
          name: ExistingUser.user.name,
          email: ExistingUser.user.email,
          profileImage: ExistingUser.user.profileImage,
        });
      } else {
        return res.status(400).json({
          message: "User Already Exist",
          email: ExistingUser.user.email,
        });
      }
    } else {
      const ciphertext = CryptoJS.AES.encrypt(
        password,
        `${process.env.SECRET_KEY}`
      ).toString();
      console.log(ciphertext);
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
      await newUser.save();
      console.log(await newUser);
      const token = await createToken({
        email: newUser.user.email,
        name: newUser.user.name,
        id: newUser._id,
        profileImage: newUser.user.profileImage,
      });
      console.log(token);

      return res.status(200).json({
        token: token,
        message: "User Created Successfully",
        id: newUser._id.toString(),
        name: newUser.user.name,
        email: newUser.user.email,
        profileImage: newUser.user.profileImage,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export default signupUser;
