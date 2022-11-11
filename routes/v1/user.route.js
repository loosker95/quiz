const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const {tokenVerify, authRole} = require('../../middlewares/auth')



router.post('/', tokenVerify, validate(userValidation.createUser), userController.addUser)
router.get('/', tokenVerify, authRole('admin'), userController.getAllUsers)
router.get('/:id', tokenVerify, validate(userValidation.getUser), userController.findUser)
router.patch('/:id', tokenVerify, validate(userValidation.updateUser), userController.updateUser)
router.delete('/:id', tokenVerify, validate(userValidation.deleteUser),userController.deleteUser)




module.exports = router