import { Schema, mongoose } from "mongoose";
const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileImage: { type: String },
  provider: { type: String, required: true },
});
const userSubscription = new Schema({
  subscriptionName: { type: String, default: "free" },
  subscriptionType: { type: String, default: "free" },
  purchasedAt: { type: Date, default: Date.now() },
});
const chatSchema = new Schema(
  {
    prompt: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const UsersSchema = new Schema(
  {
    email: { type: String, required: true },
    googleId: { type: String },
    user: user,
    isAdmin: { type: Boolean, default: false },
    subscription: [userSubscription],
    chats: [chatSchema],
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("users", UsersSchema);
export default User;
