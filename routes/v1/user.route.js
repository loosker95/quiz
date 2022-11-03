const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const resultController = require('../../controllers/result.controller')
const questionController = require('../../controllers/question.controller')
const answerController = require('../../controllers/answer.controller')
const userToken = require('../../controllers/token.contoller')


// Users
router.post('/users', userController.addUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.findUser)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)


// Results
router.post('/results', resultController.addResult)
router.get('/results', resultController.getAllResult)
router.get('/results/:id', resultController.findResult)
router.patch('/results/:id', resultController.updateResult)
router.delete('/results/:id', resultController.deleteResult)

router.get('/view/:id', resultController.viewResult)


// // Questions
router.post('/questions', questionController.addQuestion)
router.get('/questions', questionController.allQuestions)
router.get('/questions/:id', questionController.findQuestion)
router.patch('/questions/:id', questionController.updateQuestion)
router.delete('/questions/:id', questionController.deleteQuestion)


// // Answers
router.post('/answers', answerController.addAnswer);
router.get('/answers', answerController.getAllAnswers);
router.get('/answers/:id', answerController.findAnswer);
router.patch('/answers/:id', answerController.updateAnswer);
router.delete('/answers/:id', answerController.deleteAnswer);

router.post('/response', answerController.submitAnswer);

// Token
router.post('/tokens', userToken.addToken);





module.exports = router