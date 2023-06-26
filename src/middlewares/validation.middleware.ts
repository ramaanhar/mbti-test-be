import { NextFunction, Request, Response } from 'express'
import joi from 'joi'
import { ValidationErrorRequest } from '../utils/responses'

const validationMiddleware = (schema: joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (!error) next()
    else {
      const { details } = error
      ValidationErrorRequest(res, null, details[0].message) // should return error if has validation error
    }
  }
}

export default validationMiddleware
