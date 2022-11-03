const {check, validationResult } = require('express-validator')


const userValidate = [
        check('username').notEmpty().withMessage('username is required')
        .isAlphanumeric().withMessage('username must be Alphanumeric')
        .isLength({min: 3}).withMessage('username must be at least 3 characters'),
        check('fullname').isString().optional(),
        check('email').notEmpty().isEmail(),
        check('avatar').isString().optional(),
        check('password').notEmpty().isLength({min: 3})
    ]



module.exports = {userValidate};