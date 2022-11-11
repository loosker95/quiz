const express = require('express')
const router = express.Router()
const resultController = require('../../controllers/result.controller')
const validate = require('../../middlewares/validate')
const resultValidation = require('../../validations/result.validation')
const {tokenVerify} = require('../../middlewares/auth')


router.post('/', tokenVerify, validate(resultValidation.createResult), resultController.addResult)
router.get('/', tokenVerify, resultController.getAllResult)
router.get('/:id', tokenVerify, validate(resultValidation.getResult), resultController.findResult)
router.patch('/:id', tokenVerify, validate(resultValidation.updateResult), resultController.updateResult)
router.delete('/:id', tokenVerify, validate(resultValidation.deleteResult), resultController.deleteResult)

router.get('/view/:id', resultController.viewResult)

module.exports = router