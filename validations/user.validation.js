const Joi = require('joi')

const createUserAndRegister = {
    body: Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        fullname: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required(),
        avatar: Joi.string().optional(),
        is_admin: Joi.boolean().required(),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        password: Joi.string().alphanum().min(8).optional(),
        username: Joi.string().alphanum().min(3).max(30).optional(),
        username: Joi.string().alphanum().min(3).max(30).optional(),
        fullname: Joi.string().optional().optional(),
        email: Joi.string().email().required().optional(),
        password: Joi.string().alphanum().min(8).optional(),
        avatar: Joi.string().optional(),
        is_admin: Joi.boolean().required().optional(),
    })
}

const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
}

const loginUser = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}


module.exports = {
    createUserAndRegister,
    updateUser,
    deleteUser,
    loginUser
};  