import express from "express";
import loginUser from "../Controllers/login-controller.js";
import signupUser from "../Controllers/signup-controller.js";
import {
  LoginValidator,
  SignupVaidator,
  validate,
} from "../utils/validator.js";
const authRouter = express.Router();
authRouter.post("/login", validate(LoginValidator), loginUser);
authRouter.post("/signup", validate(SignupVaidator), signupUser);
export default authRouter;
