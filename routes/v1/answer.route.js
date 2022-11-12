const express = require('express')
const router = express.Router()
const answerController = require('../../controllers/answer.controller')
const validate = require('../../middlewares/validate')
const answerValidation = require('../../validations/answer.validation')
const { tokenVerify, authRole } = require('../../middlewares/auth')


router.post('/', tokenVerify, authRole(['admin']), validate(answerValidation.createAnswer), answerController.addAnswer);
router.get('/', tokenVerify, authRole(['admin']), answerController.getAllAnswers);
router.get('/:id', tokenVerify, authRole(['admin']), validate(answerValidation.getAnswer), answerController.findAnswer);
router.patch('/:id', tokenVerify, authRole(['admin']), validate(answerValidation.updateAnswer), answerController.updateAnswer);
router.delete('/:id', tokenVerify, authRole(['admin']), validate(answerController.deleteAnswer), answerController.deleteAnswer);

router.post('/response', tokenVerify, validate(answerValidation.submitAnswer), answerController.submitAnswer);


module.exports = router