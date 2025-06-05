import { register, verifyCode, login } from "../controller/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/verify", verifyCode);
router.post("/login", login);


export default router