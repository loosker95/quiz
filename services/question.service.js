const lowerCaseValue = require('../utils/charaters')
const Question = require('../models/question.model')
const Answer =  require('../models/answer.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')


const createQuestion = (async(userBody) =>{
    userBody = lowerCaseValue(userBody, ['question', 'image']);
    return Question.create({ ...userBody });
})

const getAllQuestions = (async() =>{
    const question = await Question.findAll({})
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question
})

const getQuestionByPk = (async(id) =>{
    const question = await Question.findAll({
        include: {
            model: Answer,
            where: {
              question_id: id
            }
          }
    })
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question
})

const updateQuestionByPk = (async(id, updateBody) =>{
    const question = await getQuestionByPk(id);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
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

const createSearchQuestion = (async(value) =>{
    const { question } = value

    const questions = await getAllQuestions()
    const getQuestions = questions.filter((item) =>{
        return item.question === question;
    })

    if (Object.keys(getQuestions).length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return getQuestions;
})

const createPagination = (async(values) =>{
    const pages = values.page
    const limit = values.limit
    const startIndex = (pages - 1) * limit
    const endIndex = pages * limit

    const question = await Question.findAll({offset:startIndex, limit:endIndex})

    if (Object.keys(question).length === 0) {
        throw new ApiError(question.OK, 'Question not found');
    }
    return question
})


module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionByPk,
    updateQuestionByPk,
    deleteQuestionByPK,
    createSearchQuestion,
    createPagination
}