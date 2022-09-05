import {Request, Response} from "express";
import { validadePurchase } from "../middlewares/purchaseValidationMiddleware";
import * as cardMiddleware from "../middlewares/cardValidationMiddleware"
import * as cardService from "../services/cardService";
import * as purchaseService from "../services/purchaseService";
import * as rechargeService from "../services/rechargeService";

export async function addPurchase(req:Request, res:Response) {

    const {cardId} = req.params;
    await cardMiddleware.validateCardId(cardId);

    const data = req.body
    await validadePurchase(data);

    const {businessId, password, amount} = data

    const card = await cardService.verifyCardById(Number(cardId));
    await cardService.verifyCardActiveStatus(card, true);
    await cardService.verifyExpirationDate(card.expirationDate);
    await cardService.verifyIfCardIsBlocked(card);

    await cardService.verifyPassword(password, card.password);

    const business = await purchaseService.verifyBusinessById(businessId);
    
    await purchaseService.verifyBusinessType(business.type, card.type);

    const rechargeData = await rechargeService.getRecharges(Number(cardId));
    const purchaseData = await purchaseService.getPurchases(Number(cardId));
    const rechargeValues = await rechargeService.getRechargeValues(rechargeData);
    const purchaseValues = await purchaseService.getPurchaseValues(purchaseData);
    const balance = await cardService.getBalance(rechargeValues,purchaseValues);

    await purchaseService.isPurchaseAllow(balance, amount);
    
    await purchaseService.addPurchase(Number(cardId), businessId, amount);

    res.sendStatus(201);
}