const lowerCaseValue = require('../utils/charaters')
const Result = require('../models/result.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')

const createResult = (async(userBody) =>{
    userBody = lowerCaseValue(userBody, ['user_id', 'question_id', 'answer_selected', 'score']);
    return Result.create({ ...userBody });
})

const getAllResult = (async() =>{
    return Result.findAll({})
})

const getResultByPk = (async(id) =>{
    return Result.findByPk(id)
})

const updateResultByPk = (async(id, updateBody) =>{
    const result = await getResultByPk(id);
    updateBody = lowerCaseValue(updateBody, ['user_id', 'question_id', 'answer_selected', 'score']);
    Object.assign(result, updateBody);
    await result.save();
    return result;
})

const deleteResultByPk = (async(id) =>{
    const result = await getResultByPk(id)
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Result not found');
    }
    await result.destroy()
    return result
})

const viewResult = (async(id) =>{ 
    const view = Result.findByPk(id)
    if (!view) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Result not found');
    }
    return view
})


module.exports = {
    createResult,
    getAllResult,
    getResultByPk,
    updateResultByPk,
    deleteResultByPk,
    viewResult
}