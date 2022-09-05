import { Router } from "express";
import { activateCard, blockCard, createCard, getBalance, unblockCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.put("/card/:cardId", activateCard);
cardRouter.post("/card/:cardId/blocked", blockCard);
cardRouter.post("/card/:cardId/unblocked", unblockCard);
cardRouter.get("/card/:cardId", getBalance);


export default cardRouter;
