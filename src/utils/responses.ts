import { Response } from 'express'

export const SuccessfulCreateResponse = (res: Response, message?: string, data?: any): Response => {
  return res.status(201).json({
    status: 'ok',
    message: message ?? 'Successfully created!',
    data
  })
}

export const SuccessfulResponse = (res: Response, message?: string, data?: any): Response => {
  return res.status(200).json({
    status: 'ok',
    message: message ?? 'Success',
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

export const ValidationErrorResponse = (res: Response, err: any, message?: string): Response => {
  return res.status(400).json({
    status: 'error',
    message: message ?? err.message
  })
}

export const UnauthorizedResponse = (res: Response, message?: string): Response => {
  return res.status(401).json({
    status: 'error',
    message: message ?? 'Unauthorized'
  })
}

export const ForbiddenResponse = (res: Response, message?: string): Response => {
  return res.status(403).json({
    status: 'error',
    message: message ?? 'Forbidden'
  })
}
// all messages
// should return custom message if message is exist, and should return "Success" message if message is not exist
