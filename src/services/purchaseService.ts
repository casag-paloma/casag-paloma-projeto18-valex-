import * as businessRepository from "../repositories/businessRepository";
import * as paymentRepository from "../repositories/paymentRepository";
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

export async function getPurchases(cardId:number) {
    const purchases = await paymentRepository.findByCardId(cardId);
    return purchases
}

async function getPurchaseArrayValues(purchaseData:[paymentRepository.Payment]) {
    const purchaseArrayValues = purchaseData.map(({amount}) => amount)
    console.log(purchaseArrayValues);
    const purchaseValues = purchaseArrayValues.reduce(function(acc, cur) {
        return acc + cur;
    });
    console.log(purchaseValues);
    return purchaseValues;
}

export async function getPurchaseValues(purchaseData:any) {
    console.log(purchaseData, purchaseData.length)
    if(purchaseData.length > 0){
        const purchaseValues =getPurchaseArrayValues(purchaseData);
        return purchaseValues;
    }
    else return 0
    
}
