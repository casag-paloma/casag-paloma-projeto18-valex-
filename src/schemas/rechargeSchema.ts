import Joi from "joi";

const rechargeSchema = Joi.object({
  amount: Joi.number().greater(0).required(),
});


export default rechargeSchema;