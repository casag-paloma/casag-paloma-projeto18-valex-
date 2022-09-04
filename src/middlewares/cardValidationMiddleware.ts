import { findByApiKey } from "../repositories/companyRepository";
import cardShema from "../schemas/cardSchema";

function notFoundError(entity:string) {
	return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
}

export async function verifyApiKey(apiKey:any) {
    
    const company = await findByApiKey(apiKey);
    console.log(company)

    if(!company) throw {type: "error_not_found",
    message: `Could not find specified!`}

}

export async function validadeCardType(type:string) {
    
    const {error} =  cardShema.validate(type);
    console.log(error)
    if(error) throw {
		type: "error_bad_request",
		message: `invalid request!`
	} 

}


export default{
    verifyApiKey
}