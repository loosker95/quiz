const Result = require('../models/result.model');
const httpStatus = require('http-status');
const response = require('../utils/templateResponse')
const catchAsync = require('../utils/catchAsync')
const { resultService } = require('../services')

module.exports = {

    addResult: catchAsync(async (req, res) => {
        const data = await resultService.createResult(req.body)
        res.send(response(httpStatus.CREATED, 'Result added successfully', data));
    }),

    getAllResult: catchAsync(async (req, res) => {
        const data = await resultService.getAllResult()
        res.send(response(httpStatus.OK, 'Get all results', data));
    }),

    findResult: catchAsync(async (req, res) => {
        const data = await resultService.getResultByPk(req.params.id)
        res.send(response(httpStatus.OK, 'Get result', data));
    }),

    updateResult: catchAsync(async (req, res) => {
        const data = await resultService.updateResultByPk(req.params.id, req.body)
        res.send(response(httpStatus.OK, 'Result updated successfully', data));
    }),

    deleteResult: catchAsync(async (req, res) => {
        await resultService.deleteResultByPk(req.params.id)
        res.send(response(httpStatus.ACCEPTED, 'Result deleted successfully'));
    }),

    viewResult: (async (req, res) => {
        const data = await resultService.viewResult(req.params.id)
        res.send(response(httpStatus.OK, 'Get results', data));
    })

}
