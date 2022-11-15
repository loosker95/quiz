const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const users = require('../models/user.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { generateTokenResetPass } = require('../utils/generateToken')
const emailConfig = require('../utils/emailConfig')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");


const resetPasswd = (async (value) => {
    const { email } = value
    const ckeckEmail = await users.isEmailTaken(email)
    if (!ckeckEmail) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'We couldn\'t find an account associated with email');
    }
    const resetPassToken = { email: email }
    const resetPasswordAccessToken = generateTokenResetPass(resetPassToken)

   
    let message = {
        from: `${process.env.APP_NAME} ${process.env.APP_EMAIL}`,
        to: `${email}`,
        subject: "Reset password",
        text: `Hello From ${process.env.APP_NAME}`,
        html: `<a class="btn btn-primary" href="${process.env.VERIFY_EMAIL_HOST}/api/v1/auth/verify-email/${resetPasswordAccessToken}" role="button">Reset password</a>`,
    }

    emailConfig.sendMail(message, (error, info) => {
        if (error) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to send email');
    });

    return resetPasswordAccessToken
})


const newResetPassword = (async (value, passBody) => {
    const password = await bcrypt.hash(passBody.password, 8)
    const getToken = value.token
    if (!getToken) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Token Invalid...');
    }
    jwt.verify(getToken, process.env.TOKEN_RESET_PASSWORD_SECRET, (error, user) => {
        if (error) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to authenticate token.'); 
        users.update({password: password},{where: {email: user.email}});
    })
    return getToken
})

module.exports = {
    resetPasswd,
    newResetPassword
}