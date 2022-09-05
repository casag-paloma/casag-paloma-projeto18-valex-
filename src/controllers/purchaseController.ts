import {Request, Response} from "express";
import { validadePurchase } from "../middlewares/purchaseValidationMiddleware";
import * as cardService from "../services/cardService";
import * as purchaseService from "../services/purchaseService";
import * as rechargeService from "../services/rechargeService";

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

    const rechargeData = await rechargeService.getRecharges(cardId);
    const purchaseData = await purchaseService.getPurchases(cardId);
    console.log(rechargeData, purchaseData)
    const rechargeValues = await rechargeService.getRechargeValues(rechargeData);
    const purchaseValues = await purchaseService.getPurchaseValues(purchaseData);
    console.log(rechargeValues, purchaseValues);
    const balance = await cardService.getBalance(rechargeValues,purchaseValues);

    await purchaseService.isPurchaseAllow(balance, amount);
    
    await purchaseService.addPurchase(cardId, businessId, amount);

    res.sendStatus(201);
}