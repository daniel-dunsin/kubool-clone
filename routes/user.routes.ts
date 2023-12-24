import { Router } from "express";
import validate from "../middlewares/validate.middleware";
import { editEmailnput, editUsernameInput } from "../schema/validators/user.validator";
import {
  getUserProfileController,
  updateEmailController,
  updateUsernameController,
} from "../controllers/user.controller";
import isAuthenticated from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, getUserProfileController);
userRoutes.put("/email", isAuthenticated, validate(editEmailnput), updateEmailController);
userRoutes.put("/username", isAuthenticated, validate(editUsernameInput), updateUsernameController);

export default userRoutes;
