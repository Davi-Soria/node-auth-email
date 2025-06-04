import { Router} from "express";
import * as authController from "../controller/auth.controller.ts";

const router = Router();

router.post("/register", authController.register);
router.post("/verify", authController.verifyCode);
router.post("/login", authController.login);


export default router