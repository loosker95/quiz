const httpStatus = require('http-status');
const response = require('../utils/templateResponse')
const catchAsync = require('../utils/catchAsync')
const { userService, sendEmailService, resetPassword } = require('../services')



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
    }),

    verifyEmail: catchAsync(async (req, res) => {
        await sendEmailService.emailVerification(req.params)
        res.send(response(httpStatus.CREATED, 'Email verified successfully'));
    }),

    resetPass: catchAsync(async (req, res) => {
        const data = await resetPassword.resetPasswd(req.body)
        res.send(response(httpStatus.CREATED, 'Link for password reset sent successfully', data));
    }),

    newPassReset:  catchAsync(async (req, res) => {
        const data = await resetPassword.newResetPassword(req.params, req.body)
        res.send(response(httpStatus.CREATED, 'Password have been reset successfully', data));
    }),

    logoutUser :  catchAsync(async (req, res) => {
        const data = await userService.createLogout(req.body)
        res.send(response(httpStatus.CREATED, 'Logout successfully', data));
    }),
}