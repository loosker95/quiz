const Joi = require('joi')

const createQuestion = {
    body: Joi.object().keys({
        question: Joi.string().required(),
        image: Joi.string().optional(),
    }),
};

const updateQuestion = {
    body: Joi.object().keys({
        question: Joi.string().optional(),
        image: Joi.string().optional(),
    }),
};

const getQuestion = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
}

const deleteQuestion = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
}

const searchQuestionValidation = {
    body: Joi.object().keys({
        question: Joi.string().required()
    }),
}


module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    searchQuestionValidation
};

