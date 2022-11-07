const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const {tokenVerify, authRole, refresh_Token} = require('../../middlewares/auth')



router.post('/users', validate(userValidation.createUser), userController.addUser)
router.get('/users', tokenVerify, authRole('admin'), userController.getAllUsers)
router.get('/users/:id', validate(userValidation.getUser), userController.findUser)
router.patch('/users/:id', validate(userValidation.updateUser), userController.updateUser)
router.delete('/users/:id', validate(userValidation.deleteUser),userController.deleteUser)



module.exports = router