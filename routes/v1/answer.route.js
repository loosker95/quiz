const express = require('express')
const router = express.Router()
const answerController = require('../../controllers/answer.controller')

router.post('/api/v1/answers', answerController.addAnswer);
router.get('/api/v1/answers', answerController.getAllAnswers);
router.get('/api/v1/answers/:id', answerController.findAnswer);
router.patch('/api/v1/answers/:id', answerController.updateAnswer);
router.delete('/api/v1/answers/:id', answerController.deleteAnswer);


module.exports = router