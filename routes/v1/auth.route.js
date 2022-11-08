const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const userToken = require('../../controllers/refreshToken.contoller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const authValidation = require('../../validations/auth.validation')


router.post('/register', validate(userValidation.createRegister), userController.registerUser)

router.post('/refresh-token', validate(authValidation.createRefreshToken) ,userToken.generateToken);


module.exports = router