import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import messageRoutes from "./message.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/message", messageRoutes);

export default routes;
