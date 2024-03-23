const { default: mongoose } = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../Models/User-model");
const { configDotenv } = require("dotenv");
configDotenv();
const signupUser = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { name, email, password } = req.body;
    const ciphertext = CryptoJS.AES.encrypt(
      password,
      `${process.env.SECRET_KEY}`
    ).toString();
    const newUser = new User({
      name,
      email,
      password: ciphertext,
      isAdmin: false,
    });
    await newUser.save();
    const token = jwt.sign(
      { success: true, email: email, name: name },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "1d" }
    );

    mongoose.disconnect();
    return res
      .status(200)
      .json({ token: token, message: "user created successfully" });
  } catch (error) {
    console.error(error);
  }
};
module.exports = signupUser;
