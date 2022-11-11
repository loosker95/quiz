const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/question.controller')
const validate = require('../../middlewares/validate')
const questionValidation = require('../../validations/question.validation')
const {tokenVerify} = require('../../middlewares/auth')


router.post('/', tokenVerify,validate(questionValidation.createQuestion), questionController.addQuestion)
router.get('/', tokenVerify, questionController.allQuestions)
router.get('/:id', tokenVerify, validate(questionValidation.updateQuestion), questionController.findQuestion)
router.patch('/:id', tokenVerify, validate(questionValidation.updateQuestion), questionController.updateQuestion)
router.delete('/:id', tokenVerify, validate(questionValidation.deleteQuestion), questionController.deleteQuestion)

router.get('/search/view', questionController.searchQuestion)


module.exports = router