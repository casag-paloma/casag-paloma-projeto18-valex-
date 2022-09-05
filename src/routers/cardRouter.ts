import { Router } from "express";
import { activateCard, blockCard, createCard, unblockCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.put("/card", activateCard);
cardRouter.put("/card/blocked", blockCard);
cardRouter.put("/card/unblocked", unblockCard);


export default cardRouter;
