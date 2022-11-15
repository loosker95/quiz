const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const { generateTokenCreateUser } = require('../utils/generateToken')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const users = require('../models/user.model')


const sendEmail = (async (data) => {

    // create token while register
    const dataToken = { email: data.email }
    const verifyEmailAccessToken = generateTokenCreateUser(dataToken)

    // send email
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ACCOUNT_USER,
            pass: process.env.EMAIL_ACCOUNT_PASS,
        },
    });

    let message = {
        from: `${process.env.APP_NAME} ${process.env.APP_EMAIL}`,
        to: `${data.email}`,
        subject: "Hello",
        text: `Hello From ${process.env.APP_NAME}`,
        html: `<a class="btn btn-primary" href="${process.env.VERIFY_EMAIL_HOST}/api/v1/auth/verify-email/${verifyEmailAccessToken}" role="button">Verify email</a>`,
    }

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
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