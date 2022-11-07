const httpStatus = require('http-status');
const response = require('../utils/templateResponse')
const catchAsync = require('../utils/catchAsync')
const { userService } = require('../services')

module.exports = {
    refreshToken: catchAsync(async (req, res) => {
        const data = await userService.createLogin(req.body)
        res.send(response(httpStatus.CREATED, 'Token added successfully', data));
    })
}