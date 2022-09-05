import { Router } from "express";
import { activateCard, createCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.put("/card", activateCard);


export default cardRouter;
