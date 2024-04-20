import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import appRouter from "./Routes/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
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
app.use(passport.initialize());
app.use(passport.session());
app.use("/", appRouter);
export default app;
