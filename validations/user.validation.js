const Joi = require('joi')

const createUser = {
    body: Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        fullname: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required(),
        avatar: Joi.string().optional(),
        roles: Joi.string().required(),
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
        roles: Joi.string().required().optional(),
    })
}

const getUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
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


const createRegister = {
    body: Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        fullname: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required(),
        avatar: Joi.string().optional(),
        roles: Joi.string().required(),
    }),
};


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    createRegister
};  