const { config: configDotenv } = require("dotenv");
const mongoose = require("mongoose");
const User = require("../Models/User-model");

configDotenv();

const deleteUser = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await mongoose.connection.close();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = deleteUser;
