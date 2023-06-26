import { NextFunction, Request, Response } from 'express'
import RegisterInput from '../../interfaces/registerInput.interface'
import {
  BadRequestResponse,
  NotFoundResponse,
  SuccessfulCreateResponse,
  SuccessfulResponse,
  ValidationErrorRequest
} from '../../utils/responses'
import { generateToken, isPasswordCorrect } from '../../utils/auth'
import { LoginInput } from '../../interfaces/loginInput.interface'
import { Prisma } from '@prisma/client'
import { CreateNewUser, FindUserByEmail } from '../../services/user.services'

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const registerInput: RegisterInput = req.body
      const user = await CreateNewUser({ ...registerInput })
      return SuccessfulCreateResponse(res, 'Berhasil membuat user baru!', user)
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        return ValidationErrorRequest(res, err, 'Email yang Anda masukkan telah terdaftar sebelumnya.')
      }
      return BadRequestResponse(res, err)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { email, password }: LoginInput = req.body
      const user = await FindUserByEmail(email)
      if (user === null) return NotFoundResponse(res, 'Email yang Anda masukkan belum terdaftar.') // should return 404 if user doesn't exist
      const correctPassword = isPasswordCorrect(password, user.password)
      if (!correctPassword) {
        return res.status(400).json({
          // shoukd return 400 if user exist but password is wrong
          status: 'error',
          message: 'Password yang Anda masukkan salah.'
        })
      }
      const { id, email: userEmail, name, gender } = user
      const token = generateToken({ id, name, userEmail })
      return SuccessfulResponse(res, 'Berhasil login!', {
        id,
        name,
        email: userEmail,
        gender,
        token // should return 200 and has token
      })
    } catch (err: any) {
      return BadRequestResponse(res, err)
    }
  }
}

export default new AuthController()
