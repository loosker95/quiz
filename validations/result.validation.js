const Joi = require('joi')

const createResult = {
    body: Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        fullname: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required(),
        avatar: Joi.string().optional(),
        is_admin: Joi.boolean().required(),
    }),
};




module.exports = {
    createUserAndRegister
};  