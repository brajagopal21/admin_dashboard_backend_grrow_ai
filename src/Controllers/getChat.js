import User from "../Models/User-model.js";

const getChat = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User Not registered" });
    }
    const allChats = user.chats;
    const currentChat = allChats.filter((chat) => chat._id == id);

    return res.status(201).json({ allChats, currentChat });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export default getChat;
