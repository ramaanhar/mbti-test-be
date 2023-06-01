import { Gender } from '@prisma/client'

export default interface RegisterInput {
  name: string
  email: string
  gender: Gender
  password: string
  retypePassword: string
}
