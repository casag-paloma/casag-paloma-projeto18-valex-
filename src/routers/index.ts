import { Router } from "express";
import battleRouter from "./cardRouter";

const router = Router();
router.use(battleRouter);

export default router;