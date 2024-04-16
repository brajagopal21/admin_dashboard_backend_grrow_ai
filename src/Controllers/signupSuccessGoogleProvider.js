import User from "../Models/User-model.js";
import { createToken } from "../utils/token-manager.js";

const signupSuccessGoogleProvider = async (req, res) => {
  try {
    const data = Object.values(req.sessionStore.sessions);

    const parsedData = [];
    for (let value of data) {
      parsedData.push(JSON.parse(value));
    }
    const googleId = parsedData[0]?.passport?.user?.googleId;

    if (req?.sessionStore && googleId) {
      const userData = await User.findOne({ googleId: googleId });
      console.log(userData);
      if (userData) {
        const token = await createToken({
          email: userData.email,
          name: userData.user.name,
          id: userData._id,
          profileImage: userData.user.profileImage,
        });
        console.log(token);
        return res.status(200).json({
          token: token,
          message: "User Created Successfully",
          id: userData._id.toString(),
          name: userData.user.name,
          email: userData.user.email,
          profileImage: userData.user.profileImage,
        });
      } else {
        throw new Error("User data not found");
      }
    } else {
      throw new Error("User authentication failed");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export default signupSuccessGoogleProvider;
