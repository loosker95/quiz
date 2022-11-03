const User = require('../models/user.model');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');


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
                res.json({ statusCode: 200, data: { users: data } })
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
        const { username, fullname, email, avatar } = req.body;
        const hashpass = await bcrypt.hash(req.body.password, 8);
        const updateUsr = { username, fullname, email, password: hashpass, avatar, updated_at: new Date()}
        try {
            await User.update(updateUsr, { where: { id: req.params.id } })
            res.json({ statusCode: 200, message: "User successfully updated" })
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
            const data = await User.findOne({ where: { email: req.body.email }})
            if(data){
                const validPassword = await bcrypt.compare(req.body.password, data.password);
                if(validPassword){
                    res.json({message: "User exists..."})
                }else{
                    res.json({ statusCode: 400, message : "Email or password incorect"})
                }
            }else{
               res.json({ statusCode: 400, message : "User does not exis"})
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    registerUser: ( async(req, res) => {
        const { username, fullname, email, password } = req.body;
        const newUser = { username, fullname, email, password }
        try {
            const checkEmail = await User.count({where: {email: req.body.email}})
            if(checkEmail !== 1){
                const data = await User.create(newUser);
                res.json({ statusCode: 200, message: "User successfully added", data: { users: data } })
            }else{
                res.json({message: "Email already exists"})
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    })
}