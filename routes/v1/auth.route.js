const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const userToken = require('../../controllers/refreshToken.contoller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')


router.post('/login', validate(userValidation.loginUser), userController.loginUser)
router.post('/register', validate(userValidation.createRegister), userController.registerUser)


router.post('/refresh-token', userToken.refreshToken);


module.exports = router