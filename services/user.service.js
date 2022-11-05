const lowerCaseValue = require('../utils/charaters')
const users = require('../models/user.model')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')


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

module.exports = {
    createUser,
    getAllUsers,
    getUserByPk,
    updateUserByPk,
    deleteUserByPk
}