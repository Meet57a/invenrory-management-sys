const AuthController = require('../controllers/Auth.controller');
const Authentication = require('../middlewares/Authentication');
const AuthValidation = require('../validations/AuthValidation');

const router = require('express').Router();


router.post("/register",AuthValidation.RegisterUserValidation,AuthController.RegisterUser)
router.post("/login",AuthValidation.LoginUser,AuthController.LoginUser)
router.get('/profile',Authentication,AuthController.ProfileController)


module.exports = router;