import {Request, Response} from "express";
import { validadePurchase } from "../middlewares/purchaseValidationMiddleware";
import * as cardService from "../services/cardService";
import * as purchaseService from "../services/purchaseService"

export async function addPurchase(req:Request, res:Response) {
    const data = req.body
    await validadePurchase(data);

    const {cardId, businessId, password, amount} = data

    const card = await cardService.verifyCardById(cardId);
    await cardService.verifyCardActiveStatus(card, true);
    await cardService.verifyExpirationDate(card.expirationDate);
    await cardService.verifyIfCardIsBlocked(card);

    await cardService.verifyPassword(password, card.password);

    const business = await purchaseService.verifyBusinessById(businessId);
    
    await purchaseService.verifyBusinessType(business.type, card.type);

    //await rechargeService.addRecharge(data.cardId, data.amount);

    res.sendStatus(201);
    
}