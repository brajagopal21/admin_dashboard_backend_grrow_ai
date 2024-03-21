const { default: mongoose } = require("mongoose");
const User = require("../Models/User-model");
const { configDotenv } = require("dotenv");
configDotenv();
const loginUser = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { name, email, password } = req.body;
    mongoose.disconnect();
    return res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
  }
};
module.exports = loginUser;
