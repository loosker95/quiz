const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const userToken = require('../../controllers/token.contoller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')



router.post('/users', validate(userValidation.createUserAndRegister), userController.addUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.findUser)
router.patch('/users/:id', validate(userValidation.updateUser), userController.updateUser)
router.delete('/users/:id', validate(userValidation.deleteUser),userController.deleteUser)

router.post('/login', validate(userValidation.loginUser), userController.loginUser)
router.post('/register', validate(userValidation.createUserAndRegister), userController.registerUser)


router.post('/tokens', userToken.refreshToken);


module.exports = router