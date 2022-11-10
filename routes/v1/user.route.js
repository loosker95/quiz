const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const {tokenVerify, authRole} = require('../../middlewares/auth')



router.post('/', validate(userValidation.createUser), userController.addUser)
router.get('/', tokenVerify, authRole('admin'), userController.getAllUsers)
router.get('/:id', validate(userValidation.getUser), userController.findUser)
router.patch('/:id', validate(userValidation.updateUser), userController.updateUser)
router.delete('/:id', validate(userValidation.deleteUser),userController.deleteUser)




module.exports = router