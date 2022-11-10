const httpStatus = require('http-status');
const response = require('../utils/templateResponse')
const catchAsync = require('../utils/catchAsync')
const { questionService} = require('../services')

module.exports = {

    addQuestion: catchAsync(async (req, res) => {
        const data = await questionService.createQuestion(req.body)
        res.send(response(httpStatus.CREATED, 'Question added successfully', data));
    }),

    allQuestions: catchAsync(async (req, res) => {
        const data = await questionService.getAllQuestions()
        res.send(response(httpStatus.OK, 'Get all questions', data));
    }),

    findQuestion: catchAsync(async (req, res) => {
        const data = await questionService.getQuestionByPk(req.params.id)
        res.send(response(httpStatus.OK, 'Get question successfully', data));
    }),

    updateQuestion: catchAsync(async (req, res) => {
        const data = await questionService.updateQuestionByPk(req.params.id, req.body)
        res.send(response(httpStatus.OK, 'Question updated successfully', data));
    }),

    deleteQuestion: catchAsync(async(req, res) =>{ 
        await questionService.deleteQuestionByPK(req.params.id)
        res.send(response(httpStatus.ACCEPTED, 'Question deleted successfully'));
    }),

    searchQuestion: catchAsync(async(req, res) =>{
        const data = await questionService.searchAndpageQuestion(req.body, req.query)
        res.send(response(httpStatus.OK, 'Get question', data));
    }),
}   