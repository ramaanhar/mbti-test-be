import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import examController from '../controllers/exam/exam.controller'

const ExamRouter: Router = Router()
ExamRouter.get('/:id', authMiddleware, examController.findOne)
ExamRouter.get('/', authMiddleware, examController.findAll)

export default ExamRouter
