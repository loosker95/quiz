const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const { generateTokenCreateUser } = require('../utils/generateToken')
const jwt = require('jsonwebtoken');
const users = require('../models/user.model')
const emailConfig = require('../utils/emailConfig')


const sendEmail = (async (data) => {

    // create token while register
    const dataToken = { email: data.email }
    const verifyEmailAccessToken = generateTokenCreateUser(dataToken)

    let message = {
        from: `${process.env.APP_NAME} ${process.env.APP_EMAIL}`,
        to: `${data.email}`,
        subject: "Email verification",
        text: `Hello From ${process.env.APP_NAME}`,
        html: `<a class="btn btn-primary" href="${process.env.VERIFY_EMAIL_HOST}/api/v1/auth/verify-email/${verifyEmailAccessToken}" role="button">Verify email</a>`,
    }

    emailConfig.sendMail(message, (error, info) => {
        if (error) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to send email');
    });

    return verifyEmailAccessToken

})


const emailVerification = (async (value) => {

    const theUserToken = value.token
    if (!theUserToken) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid, user not found');
    }
    jwt.verify(theUserToken, process.env.TOKEN_CREATE_USER_SECRET, (error, user) => {
        if (error) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to authenticate token.');
        users.update({verified: true},{where: {email: user.email}});
    })
    return theUserToken
})

module.exports = {
    sendEmail,
    emailVerification
}