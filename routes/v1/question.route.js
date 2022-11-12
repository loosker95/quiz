const express = require('express')
const router = express.Router()
const questionController = require('../../controllers/question.controller')
const validate = require('../../middlewares/validate')
const questionValidation = require('../../validations/question.validation')
const {tokenVerify, authRole} = require('../../middlewares/auth')


router.post('/', tokenVerify, authRole(['admin']), validate(questionValidation.createQuestion), questionController.addQuestion)
router.get('/', tokenVerify, authRole(['admin']), questionController.allQuestions)
router.get('/:id', tokenVerify, validate(questionValidation.updateQuestion), questionController.findQuestion)
router.patch('/:id', tokenVerify, authRole(['admin']), validate(questionValidation.updateQuestion), questionController.updateQuestion)
router.delete('/:id', tokenVerify, authRole(['admin']), validate(questionValidation.deleteQuestion), questionController.deleteQuestion)

router.get('/search/view', questionController.searchQuestion)


module.exports = router