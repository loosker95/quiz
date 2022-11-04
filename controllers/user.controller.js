const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
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

    updateUser: (async (req, res) => {
        const data = await userService.updateUserByPk(req.params.id, req.body)
        res.send(response(httpStatus.OK, 'User updated successfully', data));
    }),

    deleteUser: catchAsync(async (req, res) => {
        userService.deleteUserByPk(req.params.id)
        res.send(response(httpStatus.ACCEPTED, 'User deleted successfully'));
    }),


    loginUser: (async (req, res) => {
        try {
            const data = await User.findOne({ where: { email: req.body.email } })
            if (data) {
                const validPassword = await bcrypt.compare(req.body.password, data.password);
                if (validPassword) {
                    res.json({ message: "User exists..." })
                } else {
                    res.json({ statusCode: 400, message: "Email or password incorect" })
                }
            } else {
                res.json({ statusCode: 400, message: "User does not exis" })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    registerUser: (async (req, res) => {
        const { username, fullname, email, password } = req.body;
        const newUser = { username, fullname, email, password }
        try {
            const checkEmail = await User.count({ where: { email: req.body.email } })
            if (checkEmail !== 1) {
                const data = await User.create(newUser);
                res.json({ statusCode: 200, message: "User successfully added", data: { users: data } })
            } else {
                res.json({ message: "Email already exists" })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    })
}