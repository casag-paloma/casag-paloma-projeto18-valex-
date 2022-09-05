import {Request, Response} from "express";
import { validadeRecharge } from "../middlewares/rechargeValidationMiddleware";
import * as cardMiddleware from "../middlewares/cardValidationMiddleware"
import * as cardService from "../services/cardService"
import * as rechargeService from "../services/rechargeService"

export async function addRecharge(req:Request, res:Response) {
    
    const {authorization} = req.headers;
    const apiKey = authorization?.split('-')[0]
    await cardService.verifyApiKey(apiKey);
    
    const {cardId} = req.params;
    await cardMiddleware.validateCardId(cardId);
    
    const data = req.body
    await validadeRecharge(data);

    const card = await cardService.verifyCardById(Number(cardId));
    await cardService.verifyCardActiveStatus(card, true);
    await cardService.verifyExpirationDate(card.expirationDate);

    await rechargeService.addRecharge(data.cardId, data.amount);
    
    res.sendStatus(201);
    
}