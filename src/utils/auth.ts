import { compareSync, hashSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY ?? 'SECRET_KEY'

export const encryptPassword = (password: string): string => hashSync(password, 10)
export const isPasswordCorrect = (typed: string, encrypted: string): boolean => compareSync(typed, encrypted)
export const generateToken = (payload: any): string => sign(payload, SECRET_KEY, { expiresIn: '30d' })
export const validateToken = (token: string): any => {
  let result: any
  verify(token, SECRET_KEY, (err, payload) => {
    if (!err) result = payload
  })
  return result
}
