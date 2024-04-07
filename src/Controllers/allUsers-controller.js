import { configDotenv } from "dotenv";
import User from "../Models/User-model.js";
configDotenv();
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users Not Found" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export default getAllUsers;
