const lowerCaseValue = require('../utils/charaters')
const Question = require('../models/question.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')


const createQuestion = (async(userBody) =>{
    userBody = lowerCaseValue(userBody, ['question', 'image']);
    return Question.create({ ...userBody });
})

const getAllQuestions = (async() =>{
    return Question.findAll({})
})

const getQuestionByPk = (async(id) =>{
    return Question.findByPk(id)
})

const updateQuestionByPk = (async(id, updateBody) =>{
    const question = await getQuestionByPk(id);
    updateBody = lowerCaseValue(updateBody, ['question', 'image']);
    Object.assign(question, updateBody);
    await question.save();
    return question;
})

const deleteQuestionByPK = (async(id) =>{
    const question = await getQuestionByPk(id)
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    await question.destroy()
    return question
})

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionByPk,
    updateQuestionByPk,
    deleteQuestionByPK
}