import { Router } from "express";
import userRouter from "./user.routes.js";
import authRouter from "./auth-router.js";
import chatRoutes from "./chats-routes.js";

const appRouter = Router();
appRouter.use("/users", userRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/chats", chatRoutes);
export default appRouter;
