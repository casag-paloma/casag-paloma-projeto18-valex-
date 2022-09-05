import purchaseSchema from "../schemas/purchaseSchema";

export async function validadePurchase(data:{}) {
    
    const {error} =  purchaseSchema.validate(data);
    console.log(error)
    if(error) throw {
		type: "error_bad_request",
		message: `invalid request!`
	} 

}
