const express = require('express')
const router = express.Router()
const resultController = require('../../controllers/result.controller')


router.post('/', resultController.addResult)
router.get('/', resultController.getAllResult)
router.get('/:id', resultController.findResult)
router.patch('/:id', resultController.updateResult)
router.delete('/:id', resultController.deleteResult)

router.get('/view/:id', resultController.viewResult)

module.exports = router
