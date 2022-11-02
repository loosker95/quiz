const express = require('express')
const router = express.Router()
const resultController = require('../../controllers/result.controller')

router.post('/api/v1/results', resultController.addResult)
router.get('/api/v1/results', resultController.getAllResult)
router.get('/api/v1/results/:id', resultController.findResult)
router.patch('/api/v1/results/:id', resultController.updateResult)
router.delete('/api/v1/results/:id', resultController.deleteResult)

router.get('/api/v1/view/:id', resultController.viewResult)


module.exports = router