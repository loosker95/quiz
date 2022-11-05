const express = require('express')
const router = express.Router()
const answerController = require('../../controllers/answer.controller')
const validate = require('../../middlewares/validate')
const answerValidation = require('../../validations/answer.validation')


router.post('/', validate(answerValidation.createAnswer), answerController.addAnswer);
router.get('/', answerController.getAllAnswers);
router.get('/:id', answerController.findAnswer);
router.patch('/:id', validate(answerValidation.updateAnswer), answerController.updateAnswer);
router.delete('/:id', validate(answerController.deleteAnswer), answerController.deleteAnswer);

router.post('/response', validate(answerValidation.submitAnswer), answerController.submitAnswer);


module.exports = router