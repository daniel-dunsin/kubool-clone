import { Router } from "express";
import validate from "../middlewares/validate.middleware";
import {
  forgotPasswordInput,
  googleAuthInput,
  resetPasswordInput,
  signInInput,
  signUpInput,
} from "../schema/validators/auth.validator";
import {
  forgotPasswordController,
  googleSignInController,
  resetPasswordController,
  signInController,
  signUpController,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", validate(signUpInput), signUpController);
authRoutes.post("/login", validate(signInInput), signInController);
authRoutes.post("/google", validate(googleAuthInput), googleSignInController);
authRoutes.post("/password/forgot", validate(forgotPasswordInput), forgotPasswordController);
authRoutes.patch("/password/reset", validate(resetPasswordInput), resetPasswordController);

export default authRoutes;
