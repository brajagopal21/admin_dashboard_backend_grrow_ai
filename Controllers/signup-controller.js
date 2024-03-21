const { default: mongoose } = require("mongoose");
const User = require("../Models/User-model");
const { configDotenv } = require("dotenv");
configDotenv();
const signupUser = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password, isAdmin: false });
    await newUser.save();
    mongoose.disconnect();
    return res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
  }
};
module.exports = signupUser;
