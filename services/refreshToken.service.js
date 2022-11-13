const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const Token = require('../models/refreshToken.model');
const User = require('../models/user.model')
const { generateToken } = require('../utils/generateToken')



const refreshTokenGenerate = (async (dataBody) => {
    const allTokens = await Token.getUserRetfreshToken(dataBody.user_id)
    const refreshToken = allTokens.map(function (i) { return i.refresh_token });
    const curentRefreshToken = dataBody.refresh_token
    if (refreshToken == null) throw new ApiError(httpStatus.UNAUTHORIZED, 'Failed to authenticate token.');
    if (!refreshToken.includes(curentRefreshToken)) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');

    const getUserInfo = await User.findOne({ raw: true, where: { id: dataBody.user_id } })
    const payload = { email: getUserInfo.email, id: getUserInfo.id }
        const accessToken = generateToken(payload)
        return { accessToken: accessToken }
})



module.exports = { refreshTokenGenerate }

