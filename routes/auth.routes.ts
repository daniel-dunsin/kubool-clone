import { Router } from "express";
import validate from "../middlewares/validate.middleware";
import { signInInput, signUpInput } from "../schema/validators/auth.validator";
import { signInController, signUpController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", validate(signUpInput), signUpController);
authRoutes.post("/login", validate(signInInput), signInController);

export default authRoutes;
