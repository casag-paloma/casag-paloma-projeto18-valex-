import { Request, Response } from "express";
import * as cardMiddleware from "../middlewares/cardValidationMiddleware";
import * as cardService from "../services/cardService";
import * as purchaseService from "../services/purchaseService";
import * as rechargeService from "../services/rechargeService";

export async function createCard(req:Request, res: Response) {

    const {authorization} = req.headers;
    const apiKey = authorization?.split('-')[0]
    const data = req.body;

    await cardMiddleware.validadeCardType(data);
    await cardService.verifyApiKey(apiKey);
    const {employeeId, type} = data;
    
    const employeeFullName = await cardService.verifyEmployeeId(employeeId);
    await cardService.verifyEmployeeIdAndType(employeeId, type);

    const cardInfo = await cardService.generateCardInfo(employeeId, type, employeeFullName);
    await cardService.createCard(cardInfo);

    res.sendStatus(201);
    
}

export async function activateCard(req:Request, res: Response) {
    const {cardId} = req.params;
    await cardMiddleware.validateCardId(cardId);
    const data = req.body;
    await cardMiddleware.validadeActiveCard(data);
    const {securityCode, password} = data;
    
    const card = await cardService.verifyCardById(Number(cardId));
    await cardService.verifyExpirationDate(card.expirationDate);
    await cardService.verifyCardActiveStatus(card, false);
    await cardService.verifySecurityCode(securityCode, card.securityCode)
    
    const encryptPassword = await cardService.encryptPassword(password);
    await cardService.activeCard(Number(cardId), encryptPassword);
    res.sendStatus(200);
    
}

export async function verificationBlockStatusFunctions(cardId:string, data:any, doIwannaBlock:boolean) {

    await cardMiddleware.validateCardId(cardId);
    await cardMiddleware.validadeBlockStatusCard(data);
    const card = await cardService.verifyCardById(data.id);
    await cardService.verifyExpirationDate(card.expirationDate);
    await cardService.verifyCardBlockedStatus(card, doIwannaBlock);
    await cardService.verifyPassword(data.password, card.password)
    
}

export async function blockCard(req:Request, res: Response){
    const data = req.body;
    const {cardId} = req.params;

    await verificationBlockStatusFunctions(cardId, data,true);
    await cardService.changeBlockStatusCard(data.id,true);
    res.sendStatus(200)
}

export async function unblockCard(req:Request, res: Response){
    const data = req.body;
    const {cardId} = req.params;

    await verificationBlockStatusFunctions(cardId,data,false);
    await cardService.changeBlockStatusCard(data.id,false);
    res.sendStatus(200)
}

export async function getBalance(req:Request, res: Response) {

    const {cardId} = req.params;
    await cardMiddleware.validateCardId(cardId);
    
    const rechargeData = await rechargeService.getRecharges(Number(cardId));
    const purchaseData = await purchaseService.getPurchases(Number(cardId));
    const rechargeValues = await rechargeService.getRechargeValues(rechargeData);
    const purchaseValues = await purchaseService.getPurchaseValues(purchaseData);
    const balance = await cardService.getBalance(rechargeValues,purchaseValues);
    const result = await cardService.generateBalanceResponse(balance, rechargeData, purchaseData);

    res.status(200).send(result);
}
