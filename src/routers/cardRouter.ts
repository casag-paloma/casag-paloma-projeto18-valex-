import { Router } from "express";
import { activateCard, blockCard, createCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.put("/card", activateCard);
cardRouter.put("/card/blocked", blockCard);

export default cardRouter;
