import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import RegisterInput from '../interfaces/registerInput.interface'
import { BadRequestResponse, NotFoundResponse, SuccessfulCreateResponse, SuccessfulResponse } from '../utils/responses'
import { encryptPassword, generateToken, isPasswordCorrect } from '../utils/auth'
import { LoginInput } from '../interfaces/loginInput.interface'

class AuthController {
  private readonly prisma = new PrismaClient()

  register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { name, email, gender, password }: RegisterInput = req.body
      const encryptedPassword = encryptPassword(password)
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          gender,
          password: encryptedPassword
        }
      })
      return SuccessfulCreateResponse(res, 'Berhasil membuat user baru!', user)
    } catch (err: any) {
      return BadRequestResponse(res, err)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { email, password }: LoginInput = req.body
      const user = await this.prisma.user.findFirst({ where: { email } })
      if (user === null) return NotFoundResponse(res, 'Email yang Anda masukkan belum terdaftar.')
      const correctPassword = isPasswordCorrect(password, user.password)
      if (!correctPassword) {
        return res.status(400).json({
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
        token
      })
    } catch (err: any) {
      return BadRequestResponse(res, err)
    }
  }
}

export default new AuthController()
