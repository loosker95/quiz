const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/question.controller')


router.post('/', questionController.addQuestion)
router.get('/', questionController.allQuestions)
router.get('/:id', questionController.findQuestion)
router.patch('/:id', questionController.updateQuestion)
router.delete('/:id', questionController.deleteQuestion)




module.exports = router