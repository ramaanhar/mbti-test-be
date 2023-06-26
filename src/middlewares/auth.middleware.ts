import { NextFunction, Request, Response } from 'express'
import { ForbiddenResponse, UnauthorizedResponse } from '../utils/responses'
import { validateToken } from '../utils/auth'

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]
  if (!token) UnauthorizedResponse(res, 'Anda harus login terlebih dahulu')
  else {
    const payload = validateToken(token)
    if (!payload) ForbiddenResponse(res, 'Anda harus login lagi')
    else {
      res.locals.user = payload
      next()
    }
  }
}

export default authMiddleware
