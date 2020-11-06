//validation using hapi/joi
const  Joi = require("@hapi/joi");

exports.validateRegistration = data =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        password_confirmation: Joi.string().min(6).required()
    })

    //return result of operation
    return schema.validate(data);
}

exports.validateLogin = data =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    //return result of operation
    return schema.validate(data);
}