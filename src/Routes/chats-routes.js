import { Router } from "express";
import { ChatValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import generateContent from "../Controllers/generateContent.js";
import getAllChats from "../Controllers/getAllChats.js";
import getChat from "../Controllers/getChat.js";

const chatRoutes = Router();

chatRoutes.post(
  "/newChat",
  validate(ChatValidator),
  verifyToken,
  generateContent
);
chatRoutes.get("/getAllChats", verifyToken, getAllChats);
chatRoutes.get("/getChat/:id", verifyToken, getChat);
export default chatRoutes;
