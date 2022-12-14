const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const userToken = require('../../controllers/refreshToken.contoller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const authValidation = require('../../validations/auth.validation')
const { tokenVerify } = require('../../middlewares/auth')


router.post('/register', validate(userValidation.createRegister), userController.registerUser)
router.post('/verify-email/:token', userController.verifyEmail)

router.post('/reset-password', validate(userValidation.resetPasswd), userController.resetPass)
router.post('/new-password/:token', validate(userValidation.resetNewPasswd), userController.newPassReset)

router.post('/refresh-token', validate(authValidation.createRefreshToken) ,userToken.generateToken);

router.post('/login', validate(userValidation.loginUser), userController.loginUser)

router.delete('/logout', tokenVerify, userController.logoutUser)




module.exports = router