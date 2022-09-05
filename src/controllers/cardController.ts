import { Request, Response } from "express";
import * as cardMiddleware from "../middlewares/cardValidationMiddleware";
import * as cardService from "../services/cardService";
import * as purchaseService from "../services/purchaseService";
import * as rechargeService from "../services/rechargeService";

export async function createCard(req:Request, res: Response) {

    const {authorization} = req.headers;
    console.log(authorization);
    const apiKey = authorization?.split('-')[0]
    console.log(apiKey)
    const data = req.body;
    
    await cardMiddleware.validadeCardType(data);
    await cardService.verifyApiKey(apiKey);
    const {employeeId, type} = data;
    
    const employeeFullName = await cardService.verifyEmployeeId(employeeId);
    await cardService.verifyEmployeeIdAndType(employeeId, type);

    const cardInfo = await cardService.generateCardInfo(employeeId, type, employeeFullName);
    await cardService.createCard(cardInfo);

    res.status(201).send('aqui');
    
}

export async function activateCard(req:Request, res: Response) {
    const data = req.body;

    await cardMiddleware.validadeActiveCard(data);
    const {id, securityCode, password} = data;
    
    const card = await cardService.verifyCardById(id);
    await cardService.verifyExpirationDate(card.expirationDate);
    await cardService.verifyCardActiveStatus(card, false);
    await cardService.verifySecurityCode(securityCode, card.securityCode)
    
    const encryptPassword = await cardService.encryptPassword(password);
    await cardService.activeCard(id, encryptPassword);
    res.sendStatus(200);
    
}

export async function verificationBlockStatusFunctions(data:any, doIwannaBlock:boolean) {

    await cardMiddleware.validadeBlockStatusCard(data);
    const card = await cardService.verifyCardById(data.id);
    await cardService.verifyExpirationDate(card.expirationDate);
    await cardService.verifyCardBlockedStatus(card, doIwannaBlock);
    await cardService.verifyPassword(data.password, card.password)
    
}

export async function blockCard(req:Request, res: Response){
    const data = req.body;

    await verificationBlockStatusFunctions(data,true);
    await cardService.changeBlockStatusCard(data.id,true);
    res.sendStatus(200)
}

export async function unblockCard(req:Request, res: Response){
    const data = req.body;

    await verificationBlockStatusFunctions(data,false);
    await cardService.changeBlockStatusCard(data.id,false);
    res.sendStatus(200)
}

export async function getBalance(req:Request, res: Response) {

    const {cardId} = req.params;
    await cardMiddleware.validateCardId(cardId);
    const numberCardId = Number(cardId);
    const rechargeData = await rechargeService.getRecharges(numberCardId);
    const purchaseData = await purchaseService.getPurchases(numberCardId);
    console.log(rechargeData, purchaseData)
    const rechargeValues = await rechargeService.getRechargeValues(rechargeData);
    const purchaseValues = await purchaseService.getPurchaseValues(purchaseData);
    console.log(rechargeValues, purchaseValues);
    const balance = await cardService.getBalance(rechargeValues,purchaseValues);
    const result = await cardService.generateBalanceResponse(balance, rechargeData, purchaseData);

    res.status(200).send(result);
}
