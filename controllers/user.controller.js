const User = require('../models/user.model');
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");


module.exports = {
    addUser: (async (req, res) => {
        const { username, fullname, email, password } = req.body;
        const newUser = { username, fullname, email, password }
        try {
            const data = await User.create(newUser);
            res.json({ statusCode: 200, message: "User successfully added", data: { users: data } })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    getAllUsers: (async (req, res) => {
        try {
            const data = await User.findAll({});
            if (Object.keys(data).length !== 0) {
                res.json({ statusCode: 200, message: "All users", data: { users: data } })
            } else {
                res.json({ statusCode: 200, message: "Empty...No Data available!" })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    findUser: (async (req, res) => {
        try {
            const data = await User.findOne({ where: { id: req.params.id } })
            if (data) {
                res.json({ statusCode: 200, data: { users: data } })
            } else {
                res.json({ statusCode: 200, message: 'User doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    updateUser: (async (req, res) => {
        const { username, fullname, email, password, avatar } = req.body;
        const updateUsr = { username, fullname, email, password, avatar }
        try {
            await User.update(updateUsr, { where: { id: req.params.id } })
            res.json({ statusCode: 200, message: "User successfully update" })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    deleteUser: (async (req, res) => {
        try {
            const data = await User.destroy({ where: { id: req.params.id } })
            if (data) {
                res.json({ statusCode: 200, message: 'User successfully deleted' })
            } else {
                res.json({ statusCode: 200, message: 'User doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    loginUser: (async (req, res) => {
        try {
            const data = await User.findOne({ where: { [Op.and]: [{ username: req.body.username }, { password: req.body.password }] } })
            if(data){
                res.json({ statusCode: 200, data: { users: data } })
            }else{
               res.json({ statusCode: 400, error : "Email or password is incorrect"})
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    registerUser: ((req, res) => {
        res.json({ message: "register" })
    })
}