import { Response } from 'express'

export const SuccessfulCreateResponse = (res: Response, message?: string, data?: any): Response => {
  return res.status(201).json({
    status: 'ok',
    message: message ?? 'Success',
    data
  })
}

export const SuccessfulResponse = (res: Response, message?: string, data?: any): Response => {
  return res.status(200).json({
    status: 'ok',
    message: message ?? 'Successfully created!',
    data
  })
}

export const NotFoundResponse = (res: Response, message?: string): Response => {
  return res.status(404).json({
    status: 'error',
    message: message ?? 'Not found'
  })
}

export const BadRequestResponse = (res: Response, err: any): Response => {
  return res.status(400).json({
    status: 'error',
    message: 'Unexpected error.',
    error: err.message
  })
}

export const ValidationErrorRequest = (res: Response, err: any, message?: string): Response => {
  return res.status(400).json({
    status: 'error',
    message: message ?? err.message
  })
}
