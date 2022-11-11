const express = require('express')
const router = express.Router()
const answerController = require('../../controllers/answer.controller')
const validate = require('../../middlewares/validate')
const answerValidation = require('../../validations/answer.validation')
const { tokenVerify } = require('../../middlewares/auth')


router.post('/', tokenVerify, validate(answerValidation.createAnswer), answerController.addAnswer);
router.get('/', tokenVerify, answerController.getAllAnswers);
router.get('/:id', tokenVerify, validate(answerValidation.getAnswer), answerController.findAnswer);
router.patch('/:id', tokenVerify, validate(answerValidation.updateAnswer), answerController.updateAnswer);
router.delete('/:id', tokenVerify, validate(answerController.deleteAnswer), answerController.deleteAnswer);

router.post('/response', tokenVerify, validate(answerValidation.submitAnswer), answerController.submitAnswer);


module.exports = router