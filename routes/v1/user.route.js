const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const userToken = require('../../controllers/token.contoller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const {tokenVerify, authRole} = require('../../middlewares/auth')



router.post('/users', validate(userValidation.createUser), userController.addUser)
router.get('/users', tokenVerify, authRole(true), userController.getAllUsers)
router.get('/users/:id', validate(userValidation.getUser), userController.findUser)
router.patch('/users/:id', validate(userValidation.updateUser), userController.updateUser)
router.delete('/users/:id', validate(userValidation.deleteUser),userController.deleteUser)

router.post('/login', validate(userValidation.loginUser), userController.loginUser)
router.post('/register', validate(userValidation.createRegister), userController.registerUser)


router.post('/tokens', userToken.refreshToken);


module.exports = router