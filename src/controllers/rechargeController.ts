import {Request, Response} from "express";
import { validadeRecharge } from "../middlewares/rechargeValidationMiddleware";
import * as cardService from "../services/cardService"
import * as rechargeService from "../services/rechargeService"

export async function addRecharge(req:Request, res:Response) {
    const data = req.body
    await validadeRecharge(data);

    const {authorization} = req.headers;
    console.log(authorization);
    const apiKey = authorization?.split('-')[0]
    console.log(apiKey)
    await cardService.verifyApiKey(apiKey);

    const card = await cardService.verifyCardById(data.cardId);
    await cardService.verifyCardActiveStatus(card, true);
    await cardService.verifyExpirationDate(card.expirationDate);

    await rechargeService.addRecharge(data.cardId, data.amount);
    
    res.sendStatus(201);
    
}