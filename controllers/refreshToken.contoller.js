const httpStatus = require('http-status');
const response = require('../utils/templateResponse')
const catchAsync = require('../utils/catchAsync')
const { refreshTokenService } = require('../services')

module.exports = {
    
    generateToken: catchAsync( async(req, res) =>{
        const data = await refreshTokenService.refreshTokenGenerate(req.body)
        res.send(response(httpStatus.CREATED, 'Token generated successfully', data));
    })
}