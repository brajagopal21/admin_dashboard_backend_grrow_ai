import express from "express";
import loginUser from "../Controllers/login-controller.js";
import signupUser from "../Controllers/signup-controller.js";
import passport from "../Controllers/signupUserGoogleProvider.js";
import signupSuccessGoogleProvider from "../Controllers/signupSuccessGoogleProvider.js";
import {
  LoginValidator,
  SignupValidator,
  validate,
} from "../utils/validator.js";
import { configDotenv } from "dotenv";
configDotenv();
const authRouter = express.Router();
authRouter.post("/login", validate(LoginValidator), loginUser);
authRouter.post("/signup", validate(SignupValidator), signupUser);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: `${process.env.CLIENT_URL}/signup`,
  })
);
authRouter.get("/login/sucess", signupSuccessGoogleProvider);
authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect(`${process.env.CLIENT_URL}/login`);
});
export default authRouter;
