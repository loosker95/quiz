const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const lowerCaseValue = require('../utils/charaters')
const users = require('../models/user.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken } = require('../utils/generateToken')
const Refresh = require('../models/refreshToken.model')
const sendEmailService = require('./sendEmail.services')



const createUser = (async (userBody) => {
    userBody = lowerCaseValue(userBody, ['username', 'fullname', 'email', 'password']);
    if (await users.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email address is taken!');
    }
    if (await users.isUsernameTaken(userBody.username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username is taken!');
    }
    return users.create({ ...userBody });
});

const getAllUsers = (async () => {
    const data = await users.findAll({})
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return data
})

const getUserByPk = (async (id) => {
    const user = await users.findByPk(id)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    } else {
        return user
    }
})

const updateUserByPk = (async (id, updateBody) => {
    const user = await getUserByPk(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    updateBody = lowerCaseValue(updateBody, ['username', 'fullname', 'email', 'password']);
    Object.assign(user, updateBody);
    await user.save();
    return user;
})

const deleteUserByPk = (async (id) => {
    const user = await getUserByPk(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.destroy()
    return user
})

const createLogin = (async (values) => {
    const data = await users.findOne({ where: { email: values.email } })
    if (!data) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not exist');
    }
    const checkPassword = await bcrypt.compare(values.password, data.password);
    if (checkPassword === false) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password incorect');
    }
    const emailToken = { email: data.email, id: data.id }
    const accessToken = generateToken(emailToken)

    // Insert refresh token here to the DB 
    const refreshToken = generateRefreshToken(emailToken)
    const token = accessToken
    const expDate = process.env.REFRESH_TOKEN_EXPIRE_TIME
    const date = new Date();
    const newToken = { user_id: data.id, token: token, refresh_token: refreshToken, expiration_delay: expDate, created_at: date, updated_at: date }
    await Refresh.create(newToken)

    return ({ data, accessToken, refreshToken })
})

const createRegister = (async (values) => {
    const { username, fullname, email, password } = values
    const newRegister = { username, fullname, email, password }

    if (await users.isEmailTaken(values.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email address is taken!');
    }
    if (await users.isUsernameTaken(values.username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username is taken!');
    }
    const SendEmailToken = await sendEmailService.sendEmail(values)
    const registerNewUser = await users.create(newRegister);

    return ({registerNewUser, SendEmailToken})
})


const createLogout = (async (value) => {
    const TherefreshToken = value.refresh_token
    if (!TherefreshToken) throw new ApiError(httpStatus.UNAUTHORIZED, 'Empty, set refresh token');

    const getRefreshToken = await Refresh.findOne({ raw: true, where: { refresh_token: TherefreshToken } })
    if (!getRefreshToken || Object.keys(getRefreshToken).length == 0) throw new ApiError(httpStatus.UNAUTHORIZED, 'Failed to authenticate token.');

    const ResultRefreshToken = getRefreshToken.refresh_token
    await Refresh.destroy({ where: { refresh_token: ResultRefreshToken } })

    return ResultRefreshToken
})


module.exports = {
    createUser,
    getAllUsers,
    getUserByPk,
    updateUserByPk,
    deleteUserByPk,
    createLogin,
    createRegister,
    createLogout
}