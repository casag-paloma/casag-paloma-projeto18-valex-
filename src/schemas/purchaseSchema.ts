import Joi from "joi";

const purchaseSchema = Joi.object({

  cardId: Joi.number().required(),
  password: Joi.string().pattern(new RegExp('^[0-9]{4}$')).required(),
  businessId: Joi.number().required(),
  amount: Joi.number().greater(0).required(),
});


export default purchaseSchema;