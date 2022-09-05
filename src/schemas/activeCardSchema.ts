import Joi from "joi";

const activeCardSchema = Joi.object({
    id: Joi.number().required(),
    securityCode: Joi.string().pattern(new RegExp('^[0-9]{3}$')).required(),
    password: Joi.string().pattern(new RegExp('^[0-9]{4}$')).required()
});


export default activeCardSchema;