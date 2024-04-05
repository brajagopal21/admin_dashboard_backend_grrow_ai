import express from "express";
import getAllUsers from "../Controllers/allUsers-controller.js";
import deleteUser from "../Controllers/deleteUser-controller.js";
const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.delete("/:id", deleteUser);
export default userRouter;
