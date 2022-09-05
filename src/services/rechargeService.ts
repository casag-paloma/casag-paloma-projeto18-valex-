import { insert } from "../repositories/rechargeRepository"

export async function addRecharge(cardId:number, amount:number) {

    const rechargeData = {
        cardId,
        amount,
    }
    
    await insert(rechargeData);
}