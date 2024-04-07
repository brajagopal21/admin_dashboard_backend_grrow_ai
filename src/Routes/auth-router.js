import express from "express";
import loginUser from "../Controllers/login-controller.js";
import signupUser from "../Controllers/signup-controller.js";
import {
  LoginValidator,
  SignupValidator,
  validate,
} from "../utils/validator.js";
const authRouter = express.Router();
authRouter.post("/login", validate(LoginValidator), loginUser);
authRouter.post("/signup", validate(SignupValidator), signupUser);
export default authRouter;
