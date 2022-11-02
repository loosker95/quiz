const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/question.controller')

router.post('/api/v1/questions', questionController.addQuestion)
router.get('/api/v1/questions', questionController.allQuestions)
router.get('/api/v1/questions/:id', questionController.findQuestion)
router.patch('/api/v1/questions/:id', questionController.updateQuestion)
router.delete('/api/v1/questions/:id', questionController.deleteQuestion)


module.exports = router