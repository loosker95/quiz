const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')

router.get('/', userController.userCreate)
router.get('/api/v1/users', userController.getAllUsers)


module.exports = router