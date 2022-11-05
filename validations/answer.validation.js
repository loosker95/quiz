const Joi = require('joi')

const createAnswer = {
      body: Joi.object().keys({
            answers: Joi.string().required(),
            is_correct: Joi.boolean().required(),
            question_id: Joi.string().required(),
            image: Joi.string().optional(),
      }),
};

const updateAnswer = {
      params: Joi.object().keys({
            id: Joi.string().required(),
        }),
        body: Joi.object().keys({
            answers: Joi.string().optional(),
            is_correct: Joi.boolean().optional(),
            question_id: Joi.string().optional(),
            image: Joi.string().optional(),
        })
}

const deleteAnswer = {
      params: Joi.object().keys({
          id: Joi.string().required(),
      }),
  }

  const submitAnswer = {
      body: Joi.object().keys({
            answers: Joi.string().required(),
            is_correct: Joi.boolean().required(),
            question_id: Joi.string().required(),
            image: Joi.string().optional(),
      }),
  }

module.exports = {
      createAnswer,
      updateAnswer,
      deleteAnswer,
      submitAnswer
};

