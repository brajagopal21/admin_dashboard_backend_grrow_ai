import User from "../Models/User-model.js";

const getAllChats = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User Not registered" });
    }
    const allChats = user.chats;
    res.status(200).json({ allChats });
  } catch (error) {
    return res.status(500).json({ message: "Somethimg went wrong" });
  }
};
export default getAllChats;
