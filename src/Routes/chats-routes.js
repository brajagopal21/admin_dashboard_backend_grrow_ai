import { Router } from "express";
import { ChatValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import generateContent from "../Controllers/generateContent.js";
import getAllChats from "../Controllers/getAllChats.js";
import getChat from "../Controllers/getChat.js";
import searchData from "../Controllers/searchConsole.js";

const chatRoutes = Router();

chatRoutes.post(
  "/newChat",
  validate(ChatValidator),
  verifyToken,
  generateContent
);
//Search Console API
chatRoutes.get("/searchConsole/:siteUrl", verifyToken, async (req, res) => {
  const { siteUrl } = req.params;
  try {
    const searchDataResult = await searchData(siteUrl);
    res.json(searchDataResult);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

chatRoutes.get("/getAllChats", verifyToken, getAllChats);
chatRoutes.get("/getChat/:id", verifyToken, getChat);
export default chatRoutes;
