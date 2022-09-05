import * as businessRepository from "../repositories/businessRepository";
import { TransactionTypes } from "../repositories/cardRepository";

export async function verifyBusinessById(id:number) {
    const business = await businessRepository.findById(id);

    if(!business) throw {type: "error_not_found",
    message: `Could not find specified business!`}
    console.log(business);
    return business;
}

export async function verifyBusinessType(businessType:TransactionTypes, cardType:TransactionTypes) {
    
    if(businessType != cardType) throw {type: "error_bad_request",
    message: `Invalid request!`}
}
