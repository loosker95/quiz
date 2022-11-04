const httpStatus = require('http-status');
const response = require('../utils/templateResponse')
const catchAsync = require('../utils/catchAsync')
const { answerService } = require('../services')


module.exports = {

    addAnswer: catchAsync(async (req, res) => {
        const data = await answerService.createAnswer(req.body)
        res.send(response(httpStatus.CREATED, 'Answer added successfully', data));
    }),

    getAllAnswers: catchAsync(async (req, res) => {
        const data = await answerService.getAllAnswers()
        res.send(response(httpStatus.OK, 'Get all answers', data));
    }),

    findAnswer: catchAsync(async (req, res) => {
        const data = await answerService.getAnsersByPk(req.params.id)
        res.send(response(httpStatus.OK, 'Get answer successfully', data));
    }),

    updateAnswer: catchAsync(async (req, res) => {
        const data = await answerService.updateByPk(req.params.id, req.body)
        res.send(response(httpStatus.OK, 'Answer updated successfully', data));
    }),

    deleteAnswer: catchAsync(async (req, res) => {
        await answerService.deleteByPK(req.params.id)
        res.send(response(httpStatus.ACCEPTED, 'Answer deleted successfully'));
    }),

    submitAnswer: (async (req, res) => {
        const data = await answerService.submitAns(req.body)
        res.send(response(httpStatus.CREATED, 'Answer Submitted successfully', data));
    })

}