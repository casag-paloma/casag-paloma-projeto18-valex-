import cardSchema from "../schemas/cardSchema";
import activeCardSchema from "../schemas/activeCardSchema";

function notFoundError(entity:string) {
	return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
}


export async function validadeCardType(type:string) {
    
    const {error} =  cardSchema.validate(type);
    console.log(error)
    if(error) throw {
		type: "error_bad_request",
		message: `invalid request!`
	} 

}

export async function validadeActiveCard(data:{}) {
    
    const {error} =  activeCardSchema.validate(data);
    console.log(error)
    if(error) throw {
		type: "error_bad_request",
		message: `invalid request!`
	} 

}
