const Joi = require('joi')

const addUserValidate = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    fullname: Joi.string().optional(),
    email: Joi.string().email().required(),
    avatar: Joi.string().optional(),
    password: Joi.string().min(8).max(12).required(),
    is_admin: Joi.boolean()
})

const updateUserValidate = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(12).required(),
})


module.exports = {
    addUserValidate, 
    updateUserValidate
};