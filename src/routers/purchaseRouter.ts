import { Router } from "express";
import { addPurchase } from "../controllers/purchaseController";

const purchaseRouter = Router();

purchaseRouter.post('/purchase/:cardId', addPurchase);

export default purchaseRouter;