import { Schema, mongoose } from "mongoose";
const userSubscription = new Schema({
  subscriptionName: { type: String, required: true },
  subscriptionType: { type: String, required: true },
  purchasedAt: { type: Date, required: true },
});
const chatSchema = new Schema({
  prompt: { type: String, required: true },
  content: { type: String, required: true },
});
const UsersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    subscription: [userSubscription],
    chats: [chatSchema],
  },
  {
    timestamps: true,
  }
);
const User = new mongoose.model("users", UsersSchema);
export default User;
