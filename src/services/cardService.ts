import * as cardRepository from "../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository"
import * as employeeRepository from "../repositories/employeeRepository";

import { faker } from '@faker-js/faker'; 
import dayjs from 'dayjs'
import Cryptr from 'cryptr';
const cryptr = new Cryptr('myTotallySecretKey');

export async function verifyApiKey(apiKey:any) {
    
    const company = await companyRepository.findByApiKey(apiKey);
    console.log(company)

    if(!company) throw {type: "error_not_found",
    message: `Could not find specified!`}

}

export async function verifyEmployeeId(employeeId:number) {
    
    const employee = await employeeRepository.findById(employeeId);
    console.log(employee)

    if(!employee) throw {type: "error_not_found",
    message: `Could not find specified!`}

    return employee.fullName;
}

export async function verifyEmployeeIdAndType(employeeId:number, type:cardRepository.TransactionTypes) {
    
    const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    console.log(card)

    if(card) throw {type: "error_conflict",
    message: `There is already a card cadastred!`}
}


function createCartHolderName(employeeFullName:string){
    const arr = employeeFullName.split(' ');
    const arrWithOnlyPlusThanThreeLettersNames = arr.filter(name => name.length > 2);
    const arrWithoutMiddleNames = arrWithOnlyPlusThanThreeLettersNames.map((name, index) => {
        if (index != 0 && index != arrWithOnlyPlusThanThreeLettersNames.length-1) return name[0]
        else return name
    })
    const cardHolderName = arrWithoutMiddleNames.join(" "). toUpperCase();
    console.log(employeeFullName, arr, arrWithOnlyPlusThanThreeLettersNames, arrWithoutMiddleNames, cardHolderName);
    return cardHolderName;
}

function createExpDate(){

    const dateToday = dayjs().format('MM/YY');
    const month = dateToday.split('/')[0] 
    const year = dateToday.split('/')[1]
    const expYear = Number(year) + 5;
    const newDate = [month, expYear];
    const expirationDate = newDate.join('/');
    console.log(dateToday, year, newDate, expirationDate);
    return expirationDate;

}

function createCardCvc(){
    const cardCvc = faker.finance.creditCardCVV();
    const encryptedCvc = cryptr.encrypt(cardCvc);
    console.log(cardCvc, encryptedCvc);
    return encryptedCvc;

}


export async function generateCardInfo(employeeId:number, type:cardRepository.TransactionTypes, employeeFullName:string) {
    
    const cardNumber = faker.finance.creditCardNumber();
    const cardholderName = createCartHolderName(employeeFullName);
    const expirationDate = createExpDate();
    const securityCode = createCardCvc();

    const cardInfo = {
        employeeId,
        number:cardNumber,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type
    }
    console.log(cardInfo);

    return cardInfo;
}

export async function createCard(cardInfo: cardRepository.CardInsertData) {
    console.log(cardInfo);
    await cardRepository.insert(cardInfo);
}
