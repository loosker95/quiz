const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')

router.post('/api/v1/users', userController.addUser)
router.get('/api/v1/users', userController.getAllUsers)
router.get('/api/v1/:id', userController.findUser)
router.patch('/api/v1/:id', userController.updateUser)
router.delete('/api/v1/:id', userController.deleteUser)

router.post('/api/v1/login', userController.loginUser)
router.post('/api/v1/register', userController.registerUser)


module.exports = router