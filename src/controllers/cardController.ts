import { Request, Response } from "express";
import { connection } from "../config/database";
import * as cardMiddleware from "../middlewares/cardValidationMiddleware"

export async function createCard(req:Request, res: Response) {

    const {authorization} = req.headers;
    console.log(authorization);
    const apiKey = authorization?.split('-')[0]
    console.log(apiKey)
    const type = req.body;
    
    await cardMiddleware.verifyApiKey(apiKey);
    await cardMiddleware.validadeCardType(type);
    
    res.sendStatus(200);
    
}