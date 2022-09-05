import { Router } from "express";
import { addRecharge } from "../controllers/rechargeController";

const rechargeRouter = Router();

rechargeRouter.post('/recharge', addRecharge);

export default rechargeRouter;