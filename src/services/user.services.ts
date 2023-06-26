import { Prisma, User } from '@prisma/client'
import PrismaClient from '../utils/prisma'
import { encryptPassword } from '../utils/auth'
const prisma = PrismaClient

export const CreateNewUser = async (userInput: Prisma.UserCreateInput): Promise<User> => {
  const encryptedPassword = encryptPassword(userInput.password)
  return await prisma.user.create({
    data: {
      ...userInput,
      password: encryptedPassword
    }
  })
}

export const FindUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({ where: { email } })
}
