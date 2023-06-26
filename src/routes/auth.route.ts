import { Router } from 'express'
import authController from '../controllers/auth/auth.controller'
import validationMiddleware from '../middlewares/validation.middleware'
import loginValidation from '../validations/login.validation'
import registerValidation from '../validations/register.validation'

const AuthRouter: Router = Router()
AuthRouter.post('/login', validationMiddleware(loginValidation), authController.login)
AuthRouter.post('/register', validationMiddleware(registerValidation), authController.register)

export default AuthRouter
