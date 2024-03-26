const { configDotenv } = require("dotenv");
const { default: mongoose } = require("mongoose");
const User = require("../Models/User-model");
configDotenv();
const getAllUsers = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users Not Found" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = getAllUsers;
