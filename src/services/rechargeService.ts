import * as rechargeRepository from "../repositories/rechargeRepository"

export async function addRecharge(cardId:number, amount:number) {

    const rechargeData = {
        cardId,
        amount,
    }
    
    await rechargeRepository.insert(rechargeData);
}

export async function getRecharges(cardId:number) {
    const recharges = await rechargeRepository.findByCardId(cardId)
    return recharges
}

async function getRechargeArrayValues(rechargeData:[rechargeRepository.RechargeInsertData]) {
    const rechargeArrayValues = rechargeData.map(({amount}) => amount)
    console.log(rechargeArrayValues);
    const rechargeValues = rechargeArrayValues.reduce(function(acc, cur) {
        return acc + cur;
    });
    console.log(rechargeValues);
    return rechargeValues;
}

export async function getRechargeValues(rechargeData:any) {
    console.log(rechargeData, rechargeData.length)
    if(rechargeData.length > 0){
        const rechargeValues = getRechargeArrayValues(rechargeData)
        return rechargeValues;
    }
    else return 0
    
}
