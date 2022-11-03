const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const userToken = require('../../controllers/token.contoller')
// Validations
const User = require('../../validations/user.validation')


// Users
router.post('/users', User.userValidate, userController.addUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.findUser)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)





// Token
router.post('/tokens', userToken.refreshToken);





module.exports = router