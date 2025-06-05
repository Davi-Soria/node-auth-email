import { Router } from "express";
import authRoutes from "./auth.routes";


const router = Router();

router.use("/ping", (req, res) => {
    res.json("pong")
})

router.use("/auth", authRoutes);

export default router