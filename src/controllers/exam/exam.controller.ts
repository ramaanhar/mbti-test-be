import { NextFunction, Request, Response } from 'express'
import { BadRequestResponse, SuccessfulResponse } from '../../utils/responses'

class ExamController {
  findAll = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      return SuccessfulResponse(res)
    } catch (err: any) {
      return BadRequestResponse(res, err)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      return SuccessfulResponse(res)
    } catch (err: any) {
      return BadRequestResponse(res, err)
    }
  }
}

export default new ExamController()
