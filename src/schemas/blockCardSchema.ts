import Joi from "joi";

const blockCardSchema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[0-9]{4}$')).required()
});


export default blockCardSchema;