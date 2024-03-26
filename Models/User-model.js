const { Schema, default: mongoose } = require("mongoose");

const UsersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean },
    subscription: { type: String },
    type: { type: String },
    purchasedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("users", UsersSchema);
module.exports = User;
