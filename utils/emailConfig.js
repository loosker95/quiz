const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ACCOUNT_USER,
        pass: process.env.EMAIL_ACCOUNT_PASS,
    },
});

module.exports = transporter