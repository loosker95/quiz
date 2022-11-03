const express = require('express')
const router = express.Router()
const answerController = require('../../controllers/answer.controller')


router.post('/', answerController.addAnswer);
router.get('/', answerController.getAllAnswers);
router.get('/:id', answerController.findAnswer);
router.patch('/:id', answerController.updateAnswer);
router.delete('/:id', answerController.deleteAnswer);

router.post('/response', answerController.submitAnswer);


module.exports = router