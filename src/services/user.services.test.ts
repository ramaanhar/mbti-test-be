import { expect, vi, describe, it } from 'vitest'
import { CreateNewUser, FindUserByEmail } from './user.services'
import { Gender } from '@prisma/client'
import prisma from '../utils/__mocks__/prisma'
import { ObjectId } from 'mongodb'

// mocks
vi.mock('utils/prisma')
// vi.mock('bcrypt', () => ({
//   default: {
//     hashSync: () => 'hashedpass'
//   }
// }))

// constantas
const userData = {
  name: 'Huddesfield Fan',
  email: 'huddsfan@mail.com',
  gender: Gender.male,
  password: 'huddsfan123'
}

// const existedUserData = {
//   name: 'Existed User',
//   email: 'huddsfan@mail.com',
//   gender: Gender.male,
//   password: 'existeduser123'
// }

// tests
describe('CreateNewUser', async () => {
  it('should create new user', async () => {
    const { name, email, gender } = userData
    prisma.user.create.mockResolvedValue({
      ...userData,
      id: new ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const user = await CreateNewUser({ ...userData })
    expect(user).toMatchObject({ name, email, gender })
  })
})

describe('FindUserByEmail', async () => {
  it('should return a user data according to the inputted email, if exist', async () => {
    prisma.user.findFirst.mockResolvedValue({
      ...userData,
      id: new ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const user = await FindUserByEmail(userData.email)
    expect(user?.email).toEqual(userData.email)
  })
  it('should return null if user with email is not exist', async () => {
    prisma.user.findFirst.mockResolvedValue(null)
    const user = await FindUserByEmail(userData.email)
    expect(user).toStrictEqual(null)
  })
})
