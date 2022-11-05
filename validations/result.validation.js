const Joi = require('joi')

const createResult = {
    body: Joi.object().keys({
        user_id: Joi.string().required(),
        question_id: Joi.string().required(),
        answer_selected: Joi.string().required(),
        score: Joi.string().required(),
    }),
};

const updateResult = {
    body: Joi.object().keys({
        user_id: Joi.string().optional(),
        question_id: Joi.string().optional(),
        answer_selected: Joi.string().optional(),
        score: Joi.string().optional(),
    }),
};

const getResult = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
}

const deleteResult = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};


module.exports = {
    createResult,
    updateResult,
    getResult,
    deleteResult
};  