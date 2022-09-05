import Joi from "joi";

const rechargeSchema = Joi.object({
  cardId: Joi.number().required(),
  amount: Joi.number().greater(0).required(),
});


export default rechargeSchema;