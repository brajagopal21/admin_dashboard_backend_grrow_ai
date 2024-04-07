import { Router } from "express";
import { ChatValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import generateContent from "../Controllers/generateContent.js";

const chatRoutes = Router();

chatRoutes.post(
  "/newChat",
  validate(ChatValidator),
  verifyToken,
  generateContent
);
export default chatRoutes;
