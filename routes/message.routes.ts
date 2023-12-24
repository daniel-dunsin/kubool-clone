import { Router } from "express";
import {
  archiveMessageController,
  getArchivedMessagesController,
  getUserMessagesController,
  sendMessageController,
} from "../controllers/message.controller";
import validate from "../middlewares/validate.middleware";
import { sendMessageInput } from "../schema/validators/message.validator";
import isAuthenticated from "../middlewares/auth.middleware";

const messageRoutes = Router();

messageRoutes.get("/", isAuthenticated, getUserMessagesController);
messageRoutes.get("/archive", isAuthenticated, getArchivedMessagesController);
messageRoutes.post("/:username", validate(sendMessageInput), sendMessageController);
messageRoutes.put("/archive/:id", isAuthenticated, archiveMessageController);

export default messageRoutes;
