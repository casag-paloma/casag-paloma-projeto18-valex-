import Joi from "joi";

const activeCardSchema = Joi.object({
    securityCode: Joi.string().pattern(new RegExp('^[0-9]{3}$')).required(),
    password: Joi.string().pattern(new RegExp('^[0-9]{4}$')).required()
});


export default activeCardSchema;