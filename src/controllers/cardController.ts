import { Request, Response } from "express";
import { connection } from "../config/database";
import * as cardMiddleware from "../middlewares/cardValidationMiddleware"
import * as cardService from "../services/cardService"

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

    res.sendStatus(201);
    
}