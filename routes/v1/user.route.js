const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const userToken = require('../../controllers/token.contoller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')



router.post('/users', validate(userValidation.createUser), userController.addUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.findUser)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)


router.post('/tokens', userToken.refreshToken);


module.exports = router