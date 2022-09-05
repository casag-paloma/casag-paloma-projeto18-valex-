import rechargeSchema from "../schemas/rechargeSchema";

export async function validadeRecharge(data:{}) {
    
    const {error} =  rechargeSchema.validate(data);
    console.log(error)
    if(error) throw {
		type: "error_bad_request",
		message: `invalid request!`
	} 

}
