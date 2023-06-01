import joi from 'joi'

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})

export default loginValidation
