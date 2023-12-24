import { Router } from "express";
import validate from "../middlewares/validate.middleware";
import { googleAuthInput, signInInput, signUpInput } from "../schema/validators/auth.validator";
import { googleSignInController, signInController, signUpController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", validate(signUpInput), signUpController);
authRoutes.post("/login", validate(signInInput), signInController);
authRoutes.post("/google", validate(googleAuthInput), googleSignInController);

export default authRoutes;
