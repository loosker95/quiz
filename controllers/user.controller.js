const httpStatus = require('http-status');
const response = require('../utils/templateResponse')
const catchAsync = require('../utils/catchAsync')
const { userService } = require('../services')



module.exports = {
    addUser: catchAsync(async (req, res) => {
        const data = await userService.createUser(req.body)
        res.send(response(httpStatus.CREATED, 'User added successfully', data));
    }),

    getAllUsers: catchAsync(async (req, res) => {
        const data = await userService.getAllUsers()
        res.send(response(httpStatus.OK, 'Get all users', data));
    }),

    findUser: catchAsync(async (req, res) => {
        const data = await userService.getUserByPk(req.params.id)
        res.send(response(httpStatus.OK, 'Get user successfully', data));
    }),

    updateUser: catchAsync(async (req, res) => {
        const data = await userService.updateUserByPk(req.params.id, req.body)
        res.send(response(httpStatus.OK, 'User updated successfully', data));
    }),

    deleteUser: catchAsync(async (req, res) => {
        await userService.deleteUserByPk(req.params.id)
        res.send(response(httpStatus.ACCEPTED, 'User deleted successfully'));
    }),


    loginUser: catchAsync(async (req, res) => {
        const data = await userService.createLogin(req.body)
        res.send(response(httpStatus.CREATED, 'Token created successfully', data));
    }),

    registerUser: catchAsync(async (req, res) => {
        const data = await userService.createRegister(req.body)
        res.send(response(httpStatus.CREATED, 'User registered successfully', data));
    })
}