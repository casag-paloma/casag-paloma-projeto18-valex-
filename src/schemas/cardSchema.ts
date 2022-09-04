import Joi from "joi";

const cardShema = Joi.object({
    employeeId: Joi.number().required(),
    type: Joi.string().valid('groceries','restaurant','transport', 'education','health').required()
});

export default cardShema;