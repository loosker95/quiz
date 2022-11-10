const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/question.controller')
const validate = require('../../middlewares/validate')
const questionValidation = require('../../validations/question.validation')


router.post('/', validate(questionValidation.createQuestion), questionController.addQuestion)
router.get('/', questionController.allQuestions)
router.get('/:id', validate(questionValidation.updateQuestion), questionController.findQuestion)
router.patch('/:id', validate(questionValidation.updateQuestion), questionController.updateQuestion)
router.delete('/:id', validate(questionValidation.deleteQuestion), questionController.deleteQuestion)

router.post('/search', validate(questionValidation.searchQuestionValidation), questionController.searchQuestion)

router.get('/pages/view', questionController.paginateQuestion)


module.exports = router