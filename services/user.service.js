const lowerCaseValue = require('../utils/charaters')
const users = require('../models/user.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})


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
    const data = await users.findAll()
    if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return data
})

const getUserByPk = (async (id) => {
    const user = await users.findByPk(id)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }else{
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

const createLogin = (async(values) =>{
    const data = await users.findOne({ where: { email: values.email} })
    if(!data){
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not exist');
    }
    const checkPassword = await bcrypt.compare(values.password, data.password);
    if(checkPassword === false){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password incorect');
    }
    const token = jwt.sign({id: data.email}, process.env.TOKEN_SECRET, {expiresIn: '3600s'})
    
    // going to insert refresh token here to the DB 
    const refreshToken = jwt.sign({id: data.email}, process.env.TOKEN_SECRET_REFRESH, {expiresIn: '180s'})
    
    return {token, refreshToken}
})

const createRegister = (async(values) =>{
    const {username, fullname, email, password} = values
    const newRegister = {username, fullname, email, password}

    if (await users.isEmailTaken(values.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email address is taken!');
    }
    if (await users.isUsernameTaken(values.username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username is taken!');
    }
        return await users.create(newRegister);
})

module.exports = {
    createUser,
    getAllUsers,
    getUserByPk,
    updateUserByPk,
    deleteUserByPk,
    createLogin,
    createRegister
}