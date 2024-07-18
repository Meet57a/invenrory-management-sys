const {body} = require("express-validator")

class AuthValidation {
    static RegisterAdmin = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage('Email is required').notEmpty().withMessage('Name is required'),
        body('password').isLength({min: 6}).withMessage('Password is required').notEmpty().withMessage("Password is required"),
    ]
}

module.exports = AuthValidation;