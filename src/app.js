import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import appRouter from "./Routes/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import getContentOutline from "./services/search.js";
import calculateScore from "./services/score.js";
configDotenv();
const app = express();
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.get("/content_outline", async (req, res) => {
  const { keyword, country_code } = req.body;

  try {
    const result = await getContentOutline(keyword, country_code);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/content_score", async (req, res) => {
  const { keyword, articleId } = req.body;

  try {
    const scoreData = await calculateScore(keyword, articleId);
    res.json(scoreData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use("/", appRouter);
export default app;
