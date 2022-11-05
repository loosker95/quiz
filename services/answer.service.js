const lowerCaseValue = require('../utils/charaters')
const Answers = require('../models/answer.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')


const createAnswer = (async(userBody) =>{
    userBody = lowerCaseValue(userBody, ['answers', 'question_id', 'is_correct', 'image']);
    return Answers.create({ ...userBody });
})

const getAllAnswers = (async() =>{
    const answer = await Answers.findAll({})
    if (!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    return answer
})

const getAnsersByPk = (async(id) =>{
    const answer = await Answers.findByPk(id)
    if (!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    return answer
})

const updateByPk = (async(id, updateBody) =>{
    const answer = await getAnsersByPk(id);
    if (!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    updateBody = lowerCaseValue(updateBody, ['answers', 'is_correct', 'image']);
    Object.assign(answer, updateBody);
    await answer.save();
    return answer;
})

const deleteByPK = (async(id) =>{
    const answer = await getAnsersByPk(id)
    if (!answer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    await answer.destroy()
    return answer
})

const submitAns = (async(userBody) =>{
    userBody = lowerCaseValue(userBody, ['answers', 'question_id', 'is_correct', 'image']);
    return Answers.create({ ...userBody });
})

module.exports = {
    createAnswer,
    getAllAnswers,
    getAnsersByPk,
    updateByPk,
    deleteByPK,
    submitAns
}